from __future__ import annotations

import math
import sys
import textwrap
import warnings
from pathlib import Path


BUNDLED_SITE_PACKAGES = (
    Path.home()
    / ".cache"
    / "codex-runtimes"
    / "codex-primary-runtime"
    / "dependencies"
    / "python"
    / "Lib"
    / "site-packages"
)
if BUNDLED_SITE_PACKAGES.exists():
    sys.path.append(str(BUNDLED_SITE_PACKAGES))

import numpy as np
import pandas as pd
from PIL import Image, ImageDraw, ImageFont
from scipy import stats


DEFAULT_INPUT_FILE = Path(r"C:\Users\jeonghyeon\Downloads\Korail Logs.xlsx")
DEFAULT_OUTPUT_DIR = Path(__file__).resolve().parent
ALPHA = 0.05

REQUIRED_TASK_COLUMNS = [
    "submissionKey",
    "participantId",
    "variant",
    "taskId",
    "taskSuccess",
    "selectedSeat",
    "selectedCar",
    "completionTimeMs",
    "clickCount",
    "misclickCount",
    "roughTapCount",
    "pageTransitionCount",
    "carriageChangeCount",
    "seatSelectionCount",
    "startedAt",
    "completedAt",
    "receivedAt",
]

REQUIRED_SURVEY_COLUMNS = [
    "submissionKey",
    "participantId",
    "variant",
    "taskId",
    "section",
    "questionNumber",
    "questionName",
    "questionLabel",
    "questionType",
    "answer",
    "score",
    "reason",
    "receivedAt",
]

BEHAVIORAL_METRICS = [
    {
        "metric": "completionTimeSec",
        "label": "Completion Time (seconds)",
        "short_label": "Completion Time",
        "source_column": "completionTimeSec",
        "file_stem": "completion_time",
    },
    {
        "metric": "clickCount",
        "label": "Click Count",
        "short_label": "Click Count",
        "source_column": "clickCount",
        "file_stem": "click_count",
    },
    {
        "metric": "misclickCount",
        "label": "Misclick Count",
        "short_label": "Misclick Count",
        "source_column": "misclickCount",
        "file_stem": "misclick_count",
    },
    {
        "metric": "pageTransitionCount",
        "label": "Page Transition Count",
        "short_label": "Page Transition Count",
        "source_column": "pageTransitionCount",
        "file_stem": "page_transition_count",
    },
]

SURVEY_CONSTRUCTS = [
    {
        "taskId": "1",
        "construct": "Error Prevention",
        "question_numbers": [1, 2, 3, 4],
    },
    {
        "taskId": "2",
        "construct": "Flexibility / Controllability",
        "question_numbers": [1, 2, 3],
    },
    {
        "taskId": "3",
        "construct": "Recognition Rather Than Recall",
        "question_numbers": [1, 2, 3],
    },
    {
        "taskId": "3",
        "construct": "Visibility of System Status",
        "question_numbers": [4, 5, 6],
    },
]

VARIANT_LABELS = {"A": "Variant A", "B": "Variant B"}
VARIANT_COLORS = {"A": "#4C78A8", "B": "#F58518"}
GRID_COLOR = "#D9E1E8"
AXIS_COLOR = "#1F2937"
TEXT_COLOR = "#111827"
SUBTLE_TEXT_COLOR = "#4B5563"
BACKGROUND_COLOR = "#FFFFFF"


def main() -> None:
    input_file = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_INPUT_FILE
    output_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUTPUT_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    task_summary, survey_responses = load_and_validate(input_file)
    task_summary, survey_responses = clean_data(task_summary, survey_responses)

    behavioral_long = make_behavioral_long(task_summary)
    survey_construct_long = make_survey_construct_scores(survey_responses)

    (
        behavioral_summary,
        survey_summary,
        paired_data,
        behavioral_pair_notes,
        survey_pair_notes,
    ) = run_all_statistics(task_summary, survey_construct_long)

    outlier_report = make_outlier_report(behavioral_long, survey_construct_long)

    write_csv_outputs(
        output_dir,
        behavioral_summary,
        survey_summary,
        outlier_report,
        paired_data,
    )

    create_all_figures(output_dir, behavioral_long, survey_construct_long, paired_data)
    report_text = build_report(
        behavioral_summary,
        survey_summary,
        outlier_report,
        paired_data,
        behavioral_pair_notes,
        survey_pair_notes,
    )
    report_path = output_dir / "statistical_analysis_report.md"
    report_path.write_text(report_text, encoding="utf-8")

    verify_outputs(output_dir, behavioral_summary, survey_summary)
    print_console_summary(behavioral_summary, survey_summary, outlier_report, paired_data)


def load_and_validate(input_file: Path) -> tuple[pd.DataFrame, pd.DataFrame]:
    if not input_file.exists():
        raise FileNotFoundError(f"Input workbook not found: {input_file}")

    excel = pd.ExcelFile(input_file)
    required_sheets = {"TaskSummary", "SurveyResponses"}
    missing_sheets = sorted(required_sheets - set(excel.sheet_names))
    if missing_sheets:
        raise ValueError(f"Missing required sheet(s): {', '.join(missing_sheets)}")

    task_summary = pd.read_excel(input_file, sheet_name="TaskSummary")
    survey_responses = pd.read_excel(input_file, sheet_name="SurveyResponses")

    validate_columns(task_summary, REQUIRED_TASK_COLUMNS, "TaskSummary")
    validate_columns(survey_responses, REQUIRED_SURVEY_COLUMNS, "SurveyResponses")
    return task_summary, survey_responses


def validate_columns(df: pd.DataFrame, required_columns: list[str], sheet_name: str) -> None:
    missing = [column for column in required_columns if column not in df.columns]
    if missing:
        raise ValueError(f"{sheet_name} is missing required columns: {', '.join(missing)}")


def clean_data(
    task_summary: pd.DataFrame, survey_responses: pd.DataFrame
) -> tuple[pd.DataFrame, pd.DataFrame]:
    task = task_summary.copy()
    survey = survey_responses.copy()

    task["participantId"] = task["participantId"].map(normalize_identifier)
    task["variant"] = task["variant"].map(normalize_variant)
    task["taskId"] = task["taskId"].map(normalize_identifier)

    survey["participantId"] = survey["participantId"].map(normalize_identifier)
    survey["variant"] = survey["variant"].map(normalize_variant)
    survey["taskId"] = survey["taskId"].map(normalize_identifier)
    survey["section"] = survey["section"].map(normalize_identifier).str.lower()
    survey["questionNumber"] = pd.to_numeric(survey["questionNumber"], errors="coerce")

    numeric_task_columns = [
        "completionTimeMs",
        "clickCount",
        "misclickCount",
        "pageTransitionCount",
    ]
    for column in numeric_task_columns:
        task[column] = pd.to_numeric(task[column], errors="coerce")

    survey["score"] = pd.to_numeric(survey["score"], errors="coerce")
    task["completionTimeSec"] = task["completionTimeMs"] / 1000.0

    return task, survey


def normalize_identifier(value: object) -> str:
    if pd.isna(value):
        return ""
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value).strip()


def normalize_variant(value: object) -> str:
    return normalize_identifier(value).upper()


def make_behavioral_long(task_summary: pd.DataFrame) -> pd.DataFrame:
    rows: list[dict[str, object]] = []
    for _, row in task_summary.iterrows():
        if row["variant"] not in {"A", "B"}:
            continue
        for spec in BEHAVIORAL_METRICS:
            value = row[spec["source_column"]]
            if pd.isna(value):
                continue
            rows.append(
                {
                    "participantId": row["participantId"],
                    "taskId": row["taskId"],
                    "variant": row["variant"],
                    "variantLabel": VARIANT_LABELS[row["variant"]],
                    "metric": spec["metric"],
                    "metricLabel": spec["label"],
                    "value": float(value),
                }
            )
    return pd.DataFrame(rows)


def make_survey_construct_scores(survey_responses: pd.DataFrame) -> pd.DataFrame:
    task_survey = survey_responses[
        (survey_responses["section"] == "task")
        & (survey_responses["variant"].isin(["A", "B"]))
        & (survey_responses["taskId"].isin(["1", "2", "3"]))
    ].copy()

    construct_frames: list[pd.DataFrame] = []
    for spec in SURVEY_CONSTRUCTS:
        sub = task_survey[
            (task_survey["taskId"] == spec["taskId"])
            & (task_survey["questionNumber"].isin(spec["question_numbers"]))
        ].copy()
        grouped = (
            sub.groupby(["participantId", "taskId", "variant"], as_index=False)
            .agg(
                score=("score", "mean"),
                answered_questions=("score", "count"),
            )
            .assign(
                construct=spec["construct"],
                expected_questions=len(spec["question_numbers"]),
            )
        )
        construct_frames.append(grouped)

    if not construct_frames:
        return pd.DataFrame(
            columns=[
                "participantId",
                "taskId",
                "variant",
                "score",
                "answered_questions",
                "construct",
                "expected_questions",
                "variantLabel",
                "metric",
                "value",
            ]
        )

    survey_construct_long = pd.concat(construct_frames, ignore_index=True)
    survey_construct_long["variantLabel"] = survey_construct_long["variant"].map(VARIANT_LABELS)
    survey_construct_long["metric"] = survey_construct_long["construct"]
    survey_construct_long["value"] = survey_construct_long["score"]
    return survey_construct_long


def run_all_statistics(
    task_summary: pd.DataFrame, survey_construct_long: pd.DataFrame
) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, list[dict[str, object]], list[dict[str, object]]]:
    behavioral_rows: list[dict[str, object]] = []
    survey_rows: list[dict[str, object]] = []
    paired_rows: list[dict[str, object]] = []
    behavioral_pair_notes: list[dict[str, object]] = []
    survey_pair_notes: list[dict[str, object]] = []

    task_ids = sorted(task_summary["taskId"].dropna().unique(), key=task_sort_key)
    for task_id in task_ids:
        if task_id not in {"1", "2", "3"}:
            continue
        task_sub = task_summary[
            (task_summary["taskId"] == task_id) & (task_summary["variant"].isin(["A", "B"]))
        ]
        for spec in BEHAVIORAL_METRICS:
            paired, note = make_paired_values(
                task_sub,
                value_column=spec["source_column"],
                group_columns=["participantId", "variant"],
            )
            behavioral_pair_notes.append(
                {
                    "taskId": task_id,
                    "metric": spec["metric"],
                    "available_participants": note["available_participants"],
                    "paired_participants": note["paired_participants"],
                    "dropped_participants": note["dropped_participants"],
                }
            )
            if paired.empty:
                continue
            diff = paired["A"] - paired["B"]
            comparison = compare_paired(paired["A"], paired["B"], diff)
            behavioral_rows.append(
                {
                    "taskId": task_id,
                    "metric": spec["metric"],
                    **comparison,
                }
            )
            for participant_id, values in paired.iterrows():
                paired_rows.append(
                    {
                        "participantId": participant_id,
                        "taskId": task_id,
                        "measure_type": "behavioral",
                        "metric": spec["metric"],
                        "construct": "",
                        "A_value": values["A"],
                        "B_value": values["B"],
                        "improvement": values["A"] - values["B"],
                        "improvement_direction": "A - B; positive values favor Variant B",
                    }
                )

    for spec in SURVEY_CONSTRUCTS:
        sub = survey_construct_long[
            (survey_construct_long["taskId"] == spec["taskId"])
            & (survey_construct_long["construct"] == spec["construct"])
        ]
        paired, note = make_paired_values(
            sub,
            value_column="score",
            group_columns=["participantId", "variant"],
        )
        survey_pair_notes.append(
            {
                "taskId": spec["taskId"],
                "construct": spec["construct"],
                "available_participants": note["available_participants"],
                "paired_participants": note["paired_participants"],
                "dropped_participants": note["dropped_participants"],
            }
        )
        if paired.empty:
            continue
        diff = paired["B"] - paired["A"]
        comparison = compare_paired(paired["A"], paired["B"], diff)
        survey_rows.append(
            {
                "taskId": spec["taskId"],
                "construct": spec["construct"],
                **comparison,
            }
        )
        for participant_id, values in paired.iterrows():
            paired_rows.append(
                {
                    "participantId": participant_id,
                    "taskId": spec["taskId"],
                    "measure_type": "survey",
                    "metric": "surveyScore",
                    "construct": spec["construct"],
                    "A_value": values["A"],
                    "B_value": values["B"],
                    "improvement": values["B"] - values["A"],
                    "improvement_direction": "B - A; positive values favor Variant B",
                }
            )

    behavioral_summary = pd.DataFrame(behavioral_rows)
    survey_summary = pd.DataFrame(survey_rows)
    paired_data = pd.DataFrame(paired_rows)

    behavioral_columns = [
        "taskId",
        "metric",
        "n",
        "A_mean",
        "A_sd",
        "A_median",
        "B_mean",
        "B_sd",
        "B_median",
        "mean_improvement",
        "shapiro_p",
        "normality_result",
        "test_used",
        "statistic",
        "p_value",
        "effect_size",
        "effect_size_type",
        "significant",
        "better_variant",
    ]
    survey_columns = [
        "taskId",
        "construct",
        "n",
        "A_mean",
        "A_sd",
        "A_median",
        "B_mean",
        "B_sd",
        "B_median",
        "mean_improvement",
        "shapiro_p",
        "normality_result",
        "test_used",
        "statistic",
        "p_value",
        "effect_size",
        "effect_size_type",
        "significant",
        "better_variant",
    ]
    behavioral_summary = behavioral_summary.reindex(columns=behavioral_columns)
    survey_summary = survey_summary.reindex(columns=survey_columns)
    return (
        behavioral_summary,
        survey_summary,
        paired_data,
        behavioral_pair_notes,
        survey_pair_notes,
    )


def make_paired_values(
    df: pd.DataFrame, value_column: str, group_columns: list[str]
) -> tuple[pd.DataFrame, dict[str, int]]:
    clean = df[group_columns + [value_column]].dropna(subset=[value_column]).copy()
    grouped = clean.groupby(group_columns, as_index=False)[value_column].mean()
    paired = grouped.pivot(index="participantId", columns="variant", values=value_column)
    for variant in ["A", "B"]:
        if variant not in paired.columns:
            paired[variant] = np.nan
    paired = paired[["A", "B"]]
    available_participants = int(paired.index.nunique())
    paired = paired.dropna(subset=["A", "B"])
    note = {
        "available_participants": available_participants,
        "paired_participants": int(len(paired)),
        "dropped_participants": int(available_participants - len(paired)),
    }
    return paired, note


def compare_paired(a_values: pd.Series, b_values: pd.Series, diff_values: pd.Series) -> dict[str, object]:
    a = pd.to_numeric(a_values, errors="coerce").to_numpy(dtype=float)
    b = pd.to_numeric(b_values, errors="coerce").to_numpy(dtype=float)
    diff = pd.to_numeric(diff_values, errors="coerce").to_numpy(dtype=float)
    mask = np.isfinite(a) & np.isfinite(b) & np.isfinite(diff)
    a = a[mask]
    b = b[mask]
    diff = diff[mask]
    n = len(diff)

    shapiro_p, normality_result = shapiro_test(diff)
    use_t_test = bool(np.isfinite(shapiro_p) and shapiro_p >= ALPHA)

    if use_t_test:
        statistic, p_value = paired_t_test(diff)
        effect_size = cohens_dz(diff)
        effect_size_type = "Cohen's dz"
        test_used = "Paired t-test"
    else:
        statistic, p_value = wilcoxon_test(diff)
        effect_size = matched_pairs_rank_biserial(diff)
        effect_size_type = "Matched-pairs rank-biserial correlation"
        test_used = "Wilcoxon signed-rank test"

    mean_improvement = safe_mean(diff)
    if mean_improvement > 0:
        better_variant = "Variant B"
    elif mean_improvement < 0:
        better_variant = "Variant A"
    else:
        better_variant = "Tie"

    return {
        "n": n,
        "A_mean": safe_mean(a),
        "A_sd": safe_sd(a),
        "A_median": safe_median(a),
        "B_mean": safe_mean(b),
        "B_sd": safe_sd(b),
        "B_median": safe_median(b),
        "mean_improvement": mean_improvement,
        "shapiro_p": shapiro_p,
        "normality_result": normality_result,
        "test_used": test_used,
        "statistic": statistic,
        "p_value": p_value,
        "effect_size": effect_size,
        "effect_size_type": effect_size_type,
        "significant": "Yes" if np.isfinite(p_value) and p_value < ALPHA else "No",
        "better_variant": better_variant,
    }


def shapiro_test(diff: np.ndarray) -> tuple[float, str]:
    clean = diff[np.isfinite(diff)]
    if len(clean) < 3:
        return np.nan, "Not tested"
    if np.allclose(clean, clean[0]):
        return 1.0, "Normal"
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        result = stats.shapiro(clean)
    p_value = float(result.pvalue)
    return p_value, "Normal" if p_value >= ALPHA else "Non-normal"


def paired_t_test(diff: np.ndarray) -> tuple[float, float]:
    clean = diff[np.isfinite(diff)]
    if len(clean) == 0:
        return np.nan, np.nan
    sd = safe_sd(clean)
    mean_value = safe_mean(clean)
    if not np.isfinite(sd) or sd == 0:
        if mean_value == 0:
            return 0.0, 1.0
        return math.copysign(math.inf, mean_value), 0.0
    result = stats.ttest_1samp(clean, popmean=0.0, nan_policy="omit")
    return float(result.statistic), float(result.pvalue)


def cohens_dz(diff: np.ndarray) -> float:
    clean = diff[np.isfinite(diff)]
    sd = safe_sd(clean)
    mean_value = safe_mean(clean)
    if not np.isfinite(sd) or sd == 0:
        if mean_value == 0:
            return 0.0
        return math.copysign(math.inf, mean_value)
    return float(mean_value / sd)


def wilcoxon_test(diff: np.ndarray) -> tuple[float, float]:
    clean = diff[np.isfinite(diff)]
    nonzero = clean[~np.isclose(clean, 0.0)]
    if len(nonzero) == 0:
        return 0.0, 1.0
    result = stats.wilcoxon(nonzero, alternative="two-sided", zero_method="wilcox", method="auto")
    return float(result.statistic), float(result.pvalue)


def matched_pairs_rank_biserial(diff: np.ndarray) -> float:
    clean = diff[np.isfinite(diff)]
    nonzero = clean[~np.isclose(clean, 0.0)]
    if len(nonzero) == 0:
        return 0.0
    ranks = stats.rankdata(np.abs(nonzero), method="average")
    positive_rank_sum = float(ranks[nonzero > 0].sum())
    negative_rank_sum = float(ranks[nonzero < 0].sum())
    total_rank_sum = float(ranks.sum())
    if total_rank_sum == 0:
        return 0.0
    return (positive_rank_sum - negative_rank_sum) / total_rank_sum


def safe_mean(values: np.ndarray | pd.Series) -> float:
    clean = np.asarray(values, dtype=float)
    clean = clean[np.isfinite(clean)]
    return float(np.mean(clean)) if len(clean) else np.nan


def safe_sd(values: np.ndarray | pd.Series) -> float:
    clean = np.asarray(values, dtype=float)
    clean = clean[np.isfinite(clean)]
    return float(np.std(clean, ddof=1)) if len(clean) > 1 else np.nan


def safe_median(values: np.ndarray | pd.Series) -> float:
    clean = np.asarray(values, dtype=float)
    clean = clean[np.isfinite(clean)]
    return float(np.median(clean)) if len(clean) else np.nan


def make_outlier_report(
    behavioral_long: pd.DataFrame, survey_construct_long: pd.DataFrame
) -> pd.DataFrame:
    behavioral_outlier_source = behavioral_long[
        ["participantId", "taskId", "variant", "metric", "value"]
    ].copy()
    survey_outlier_source = survey_construct_long[
        ["participantId", "taskId", "variant", "metric", "value"]
    ].copy()
    source = pd.concat([behavioral_outlier_source, survey_outlier_source], ignore_index=True)

    rows: list[dict[str, object]] = []
    for (task_id, variant, metric), group in source.groupby(["taskId", "variant", "metric"]):
        values = pd.to_numeric(group["value"], errors="coerce").dropna()
        if values.empty:
            continue
        q1 = float(values.quantile(0.25))
        q3 = float(values.quantile(0.75))
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        for _, row in group.iterrows():
            value = row["value"]
            if pd.isna(value):
                continue
            reason = ""
            if value < lower_bound:
                reason = "Below Q1 - 1.5 * IQR"
            elif value > upper_bound:
                reason = "Above Q3 + 1.5 * IQR"
            if reason:
                rows.append(
                    {
                        "participantId": row["participantId"],
                        "taskId": task_id,
                        "variant": variant,
                        "metric": metric,
                        "value": float(value),
                        "lower_bound": lower_bound,
                        "upper_bound": upper_bound,
                        "reason": reason,
                    }
                )

    return pd.DataFrame(
        rows,
        columns=[
            "participantId",
            "taskId",
            "variant",
            "metric",
            "value",
            "lower_bound",
            "upper_bound",
            "reason",
        ],
    )


def write_csv_outputs(
    output_dir: Path,
    behavioral_summary: pd.DataFrame,
    survey_summary: pd.DataFrame,
    outlier_report: pd.DataFrame,
    paired_data: pd.DataFrame,
) -> None:
    behavioral_summary.to_csv(
        output_dir / "behavioral_statistics_summary.csv",
        index=False,
        encoding="utf-8",
        float_format="%.6g",
    )
    survey_summary.to_csv(
        output_dir / "survey_statistics_summary.csv",
        index=False,
        encoding="utf-8",
        float_format="%.6g",
    )
    outlier_report.to_csv(
        output_dir / "outlier_report.csv",
        index=False,
        encoding="utf-8",
        float_format="%.6g",
    )
    paired_data.to_csv(
        output_dir / "participant_level_paired_data.csv",
        index=False,
        encoding="utf-8",
        float_format="%.6g",
    )


def create_all_figures(
    output_dir: Path,
    behavioral_long: pd.DataFrame,
    survey_construct_long: pd.DataFrame,
    paired_data: pd.DataFrame,
) -> None:
    for spec in BEHAVIORAL_METRICS:
        metric_df = behavioral_long[behavioral_long["metric"] == spec["metric"]].copy()
        plot_grouped_boxplot(
            metric_df,
            group_column="taskId",
            value_column="value",
            title=f"{spec['label']} by Task and Variant",
            x_label="Task",
            y_label=spec["label"],
            group_order=["1", "2", "3"],
            group_label_func=lambda value: f"Task {value}",
            output_path=output_dir / f"behavioral_{spec['file_stem']}_boxplot.png",
        )

    survey_plot_df = survey_construct_long.copy()
    survey_plot_df["constructLabel"] = survey_plot_df.apply(
        lambda row: f"Task {row['taskId']}: {row['construct']}", axis=1
    )
    survey_order = [f"Task {spec['taskId']}: {spec['construct']}" for spec in SURVEY_CONSTRUCTS]
    plot_grouped_boxplot(
        survey_plot_df,
        group_column="constructLabel",
        value_column="score",
        title="Survey Construct Scores by Variant",
        x_label="Survey Construct",
        y_label="Survey Score",
        group_order=survey_order,
        group_label_func=survey_construct_axis_label,
        output_path=output_dir / "survey_construct_score_boxplot.png",
        y_min=0,
        y_max=6,
        bottom_margin=210,
    )

    plot_behavioral_mean_barplots(
        behavioral_long,
        output_dir / "behavioral_metrics_mean_barplots.png",
    )
    plot_survey_mean_barplot(
        survey_construct_long,
        output_dir / "survey_construct_mean_barplot.png",
    )
    plot_paired_completion_time(
        paired_data,
        output_dir / "paired_completion_time_plot.png",
    )
    plot_paired_survey_score(
        paired_data,
        output_dir / "paired_survey_score_plot.png",
    )


def plot_grouped_boxplot(
    df: pd.DataFrame,
    group_column: str,
    value_column: str,
    title: str,
    x_label: str,
    y_label: str,
    group_order: list[str],
    group_label_func,
    output_path: Path,
    y_min: float | None = None,
    y_max: float | None = None,
    bottom_margin: int = 150,
) -> None:
    width, height = 1500, 950
    left, right, top, bottom = 135, width - 70, 110, height - bottom_margin
    image, draw = make_canvas(width, height)
    draw_centered_text(draw, title, width // 2, 38, font(34, bold=True), TEXT_COLOR)
    draw_legend(draw, right - 260, 70)

    values = pd.to_numeric(df[value_column], errors="coerce").dropna().to_numpy(dtype=float)
    if y_min is None:
        y_min = 0.0 if len(values) == 0 or np.nanmin(values) >= 0 else float(np.nanmin(values))
    if y_max is None:
        max_value = float(np.nanmax(values)) if len(values) else 1.0
        y_max = max_value * 1.12 if max_value > 0 else 1.0
    if y_max <= y_min:
        y_max = y_min + 1.0

    draw_axes(draw, image, left, top, right, bottom, y_min, y_max, y_label)
    group_width = (right - left) / max(1, len(group_order))
    box_width = min(78, group_width * 0.22)
    offsets = {"A": -box_width * 0.7, "B": box_width * 0.7}

    for index, group in enumerate(group_order):
        center_x = left + group_width * (index + 0.5)
        label = group_label_func(group)
        draw_wrapped_centered_text(
            draw,
            label,
            center_x,
            bottom + 26,
            max_width=group_width * 0.9,
            text_font=font(19),
            fill=TEXT_COLOR,
            line_spacing=4,
        )
        for variant in ["A", "B"]:
            sample = (
                df[(df[group_column] == group) & (df["variant"] == variant)][value_column]
                .dropna()
                .to_numpy(dtype=float)
            )
            if len(sample) == 0:
                continue
            box_x = center_x + offsets[variant]
            draw_box(
                draw,
                sample,
                box_x,
                box_width,
                top,
                bottom,
                y_min,
                y_max,
                VARIANT_COLORS[variant],
            )

    draw_centered_text(draw, x_label, (left + right) // 2, height - 42, font(22, bold=True), TEXT_COLOR)
    image.save(output_path)


def draw_box(
    draw: ImageDraw.ImageDraw,
    sample: np.ndarray,
    center_x: float,
    box_width: float,
    top: int,
    bottom: int,
    y_min: float,
    y_max: float,
    color: str,
) -> None:
    q1, median, q3 = np.percentile(sample, [25, 50, 75])
    iqr = q3 - q1
    lower_fence = q1 - 1.5 * iqr
    upper_fence = q3 + 1.5 * iqr
    inlier_values = sample[(sample >= lower_fence) & (sample <= upper_fence)]
    if len(inlier_values) == 0:
        inlier_values = sample
    whisker_low = float(np.min(inlier_values))
    whisker_high = float(np.max(inlier_values))

    y_q1 = value_to_y(q1, y_min, y_max, top, bottom)
    y_q3 = value_to_y(q3, y_min, y_max, top, bottom)
    y_median = value_to_y(median, y_min, y_max, top, bottom)
    y_low = value_to_y(whisker_low, y_min, y_max, top, bottom)
    y_high = value_to_y(whisker_high, y_min, y_max, top, bottom)
    x0 = center_x - box_width / 2
    x1 = center_x + box_width / 2

    draw.line([(center_x, y_high), (center_x, y_q3)], fill=AXIS_COLOR, width=2)
    draw.line([(center_x, y_q1), (center_x, y_low)], fill=AXIS_COLOR, width=2)
    draw.line([(x0 + box_width * 0.2, y_high), (x1 - box_width * 0.2, y_high)], fill=AXIS_COLOR, width=2)
    draw.line([(x0 + box_width * 0.2, y_low), (x1 - box_width * 0.2, y_low)], fill=AXIS_COLOR, width=2)
    draw.rectangle([x0, y_q3, x1, y_q1], fill=color, outline=AXIS_COLOR, width=2)
    draw.line([(x0, y_median), (x1, y_median)], fill="#FFFFFF", width=3)

    outliers = sample[(sample < lower_fence) | (sample > upper_fence)]
    for value in outliers:
        y = value_to_y(float(value), y_min, y_max, top, bottom)
        draw.ellipse([center_x - 4, y - 4, center_x + 4, y + 4], fill="#111827")


def plot_behavioral_mean_barplots(behavioral_long: pd.DataFrame, output_path: Path) -> None:
    width, height = 1850, 1350
    image, draw = make_canvas(width, height)
    draw_centered_text(
        draw,
        "Behavioral Metrics: Mean Values by Task and Variant",
        width // 2,
        40,
        font(34, bold=True),
        TEXT_COLOR,
    )
    draw_legend(draw, width - 335, 78)

    panels = [
        (110, 125, 900, 620, BEHAVIORAL_METRICS[0]),
        (1010, 125, 1800, 620, BEHAVIORAL_METRICS[1]),
        (110, 760, 900, 1255, BEHAVIORAL_METRICS[2]),
        (1010, 760, 1800, 1255, BEHAVIORAL_METRICS[3]),
    ]
    for left, top, right, bottom, spec in panels:
        panel_df = behavioral_long[behavioral_long["metric"] == spec["metric"]]
        draw_mean_bar_panel(
            draw,
            image,
            panel_df,
            left,
            top,
            right,
            bottom,
            group_order=["1", "2", "3"],
            group_label_func=lambda value: f"Task {value}",
            title=spec["label"],
            y_label=spec["label"],
        )
    image.save(output_path)


def plot_survey_mean_barplot(survey_construct_long: pd.DataFrame, output_path: Path) -> None:
    width, height = 1700, 980
    image, draw = make_canvas(width, height)
    draw_centered_text(
        draw,
        "Survey Construct Scores: Mean by Task, Construct, and Variant",
        width // 2,
        40,
        font(32, bold=True),
        TEXT_COLOR,
    )
    draw_legend(draw, width - 335, 78)

    data = survey_construct_long.copy()
    data["group"] = data.apply(lambda row: f"Task {row['taskId']}: {row['construct']}", axis=1)
    order = [f"Task {spec['taskId']}: {spec['construct']}" for spec in SURVEY_CONSTRUCTS]
    draw_mean_bar_panel(
        draw,
        image,
        data,
        135,
        135,
        width - 70,
        height - 210,
        group_order=order,
        group_label_func=survey_construct_axis_label,
        title="Survey Score",
        y_label="Survey Score",
        y_min=0,
        y_max=6,
        group_column="group",
    )
    draw_centered_text(draw, "Survey Construct", width // 2, height - 38, font(22, bold=True), TEXT_COLOR)
    image.save(output_path)


def draw_mean_bar_panel(
    draw: ImageDraw.ImageDraw,
    image: Image.Image,
    df: pd.DataFrame,
    left: int,
    top: int,
    right: int,
    bottom: int,
    group_order: list[str],
    group_label_func,
    title: str,
    y_label: str,
    y_min: float | None = None,
    y_max: float | None = None,
    group_column: str = "taskId",
) -> None:
    plot_top = top + 48
    plot_bottom = bottom - 90
    draw_centered_text(draw, title, (left + right) // 2, top + 10, font(24, bold=True), TEXT_COLOR)

    stats_rows = []
    for group in group_order:
        for variant in ["A", "B"]:
            values = (
                df[(df[group_column] == group) & (df["variant"] == variant)]["value"]
                .dropna()
                .to_numpy(dtype=float)
            )
            mean_value = safe_mean(values)
            se_value = safe_sd(values) / math.sqrt(len(values)) if len(values) > 1 else 0.0
            stats_rows.append((group, variant, mean_value, se_value))

    max_with_error = max(
        [mean + se for _, _, mean, se in stats_rows if np.isfinite(mean)], default=1.0
    )
    if y_min is None:
        y_min = 0.0
    if y_max is None:
        y_max = max(1.0, max_with_error * 1.18)
    if y_max <= y_min:
        y_max = y_min + 1.0

    draw_axes(draw, image, left, plot_top, right, plot_bottom, y_min, y_max, y_label, label_font_size=16)
    group_width = (right - left) / max(1, len(group_order))
    bar_width = min(58, group_width * 0.22)
    offsets = {"A": -bar_width * 0.65, "B": bar_width * 0.65}

    for group, variant, mean_value, se_value in stats_rows:
        if not np.isfinite(mean_value):
            continue
        index = group_order.index(group)
        center_x = left + group_width * (index + 0.5) + offsets[variant]
        y_mean = value_to_y(mean_value, y_min, y_max, plot_top, plot_bottom)
        y_zero = value_to_y(0, y_min, y_max, plot_top, plot_bottom)
        draw.rectangle(
            [center_x - bar_width / 2, y_mean, center_x + bar_width / 2, y_zero],
            fill=VARIANT_COLORS[variant],
            outline=AXIS_COLOR,
            width=1,
        )
        y_error_top = value_to_y(mean_value + se_value, y_min, y_max, plot_top, plot_bottom)
        y_error_bottom = value_to_y(max(y_min, mean_value - se_value), y_min, y_max, plot_top, plot_bottom)
        draw.line([(center_x, y_error_top), (center_x, y_error_bottom)], fill=AXIS_COLOR, width=2)
        draw.line([(center_x - 8, y_error_top), (center_x + 8, y_error_top)], fill=AXIS_COLOR, width=2)
        draw.line([(center_x - 8, y_error_bottom), (center_x + 8, y_error_bottom)], fill=AXIS_COLOR, width=2)

    for index, group in enumerate(group_order):
        center_x = left + group_width * (index + 0.5)
        draw_wrapped_centered_text(
            draw,
            group_label_func(group),
            center_x,
            plot_bottom + 22,
            max_width=group_width * 0.92,
            text_font=font(16),
            fill=TEXT_COLOR,
            line_spacing=2,
        )


def plot_paired_completion_time(paired_data: pd.DataFrame, output_path: Path) -> None:
    data = paired_data[
        (paired_data["measure_type"] == "behavioral") & (paired_data["metric"] == "completionTimeSec")
    ].copy()
    plot_paired_panels(
        data,
        output_path,
        title="Paired Completion Time by Participant",
        panel_specs=[("1", "Task 1"), ("2", "Task 2"), ("3", "Task 3")],
        y_label="Completion Time (seconds)",
        y_min=0,
        y_max=None,
        layout=(1, 3),
        width=1750,
        height=760,
    )


def plot_paired_survey_score(paired_data: pd.DataFrame, output_path: Path) -> None:
    data = paired_data[paired_data["measure_type"] == "survey"].copy()
    panel_specs = [
        (spec["construct"], f"Task {spec['taskId']}: {spec['construct']}") for spec in SURVEY_CONSTRUCTS
    ]
    plot_paired_panels(
        data,
        output_path,
        title="Paired Survey Scores by Participant",
        panel_specs=panel_specs,
        y_label="Survey Score",
        y_min=0,
        y_max=6,
        layout=(2, 2),
        width=1750,
        height=1250,
        panel_key_column="construct",
    )


def plot_paired_panels(
    data: pd.DataFrame,
    output_path: Path,
    title: str,
    panel_specs: list[tuple[str, str]],
    y_label: str,
    y_min: float,
    y_max: float | None,
    layout: tuple[int, int],
    width: int,
    height: int,
    panel_key_column: str = "taskId",
) -> None:
    image, draw = make_canvas(width, height)
    draw_centered_text(draw, title, width // 2, 40, font(34, bold=True), TEXT_COLOR)
    draw_legend(draw, width - 335, 78)

    rows, cols = layout
    outer_left, outer_right = 100, width - 60
    outer_top, outer_bottom = 120, height - 70
    gap_x, gap_y = 70, 90
    panel_width = (outer_right - outer_left - gap_x * (cols - 1)) / cols
    panel_height = (outer_bottom - outer_top - gap_y * (rows - 1)) / rows

    all_values = pd.concat([data["A_value"], data["B_value"]], ignore_index=True).dropna().to_numpy(dtype=float)
    local_y_max = y_max
    if local_y_max is None:
        local_y_max = max(1.0, float(np.max(all_values)) * 1.12) if len(all_values) else 1.0

    for idx, (key, panel_title) in enumerate(panel_specs):
        row = idx // cols
        col = idx % cols
        left = int(outer_left + col * (panel_width + gap_x))
        top = int(outer_top + row * (panel_height + gap_y))
        right = int(left + panel_width)
        bottom = int(top + panel_height)
        plot_top = top + 55
        plot_bottom = bottom - 70
        panel_data = data[data[panel_key_column] == key]
        draw_wrapped_centered_text(
            draw,
            panel_title,
            (left + right) / 2,
            top + 8,
            max_width=panel_width,
            text_font=font(22, bold=True),
            fill=TEXT_COLOR,
            line_spacing=3,
        )
        draw_axes(
            draw,
            image,
            left,
            plot_top,
            right,
            plot_bottom,
            y_min,
            local_y_max,
            y_label,
            label_font_size=15,
        )
        x_a = left + (right - left) * 0.35
        x_b = left + (right - left) * 0.65
        for _, item in panel_data.iterrows():
            y_a = value_to_y(item["A_value"], y_min, local_y_max, plot_top, plot_bottom)
            y_b = value_to_y(item["B_value"], y_min, local_y_max, plot_top, plot_bottom)
            draw.line([(x_a, y_a), (x_b, y_b)], fill="#AEB7C2", width=1)
        for _, item in panel_data.iterrows():
            y_a = value_to_y(item["A_value"], y_min, local_y_max, plot_top, plot_bottom)
            y_b = value_to_y(item["B_value"], y_min, local_y_max, plot_top, plot_bottom)
            draw.ellipse([x_a - 4, y_a - 4, x_a + 4, y_a + 4], fill=VARIANT_COLORS["A"])
            draw.ellipse([x_b - 4, y_b - 4, x_b + 4, y_b + 4], fill=VARIANT_COLORS["B"])
        draw_centered_text(draw, "Variant A", x_a, plot_bottom + 22, font(17), TEXT_COLOR)
        draw_centered_text(draw, "Variant B", x_b, plot_bottom + 22, font(17), TEXT_COLOR)

    image.save(output_path)


def make_canvas(width: int, height: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGB", (width, height), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(image)
    return image, draw


def draw_axes(
    draw: ImageDraw.ImageDraw,
    image: Image.Image,
    left: int,
    top: int,
    right: int,
    bottom: int,
    y_min: float,
    y_max: float,
    y_label: str,
    label_font_size: int = 18,
) -> None:
    ticks = make_ticks(y_min, y_max, 5)
    for tick in ticks:
        y = value_to_y(tick, y_min, y_max, top, bottom)
        draw.line([(left, y), (right, y)], fill=GRID_COLOR, width=1)
        draw_centered_text(
            draw,
            format_tick(tick),
            left - 42,
            y - 8,
            font(label_font_size),
            SUBTLE_TEXT_COLOR,
        )
    draw.line([(left, top), (left, bottom)], fill=AXIS_COLOR, width=2)
    draw.line([(left, bottom), (right, bottom)], fill=AXIS_COLOR, width=2)
    label_x = max(4, left - 88)
    draw_vertical_text(image, y_label, label_x, (top + bottom) // 2, font(label_font_size, bold=True), TEXT_COLOR)


def draw_legend(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    label_font = font(20)
    for index, variant in enumerate(["A", "B"]):
        current_y = y + index * 32
        draw.rectangle([x, current_y, x + 24, current_y + 18], fill=VARIANT_COLORS[variant], outline=AXIS_COLOR)
        draw.text((x + 34, current_y - 2), VARIANT_LABELS[variant], font=label_font, fill=TEXT_COLOR)


def make_ticks(y_min: float, y_max: float, count: int) -> list[float]:
    if y_max <= y_min:
        return [y_min]
    raw_step = (y_max - y_min) / max(1, count)
    magnitude = 10 ** math.floor(math.log10(raw_step)) if raw_step > 0 else 1
    residual = raw_step / magnitude
    if residual <= 1:
        nice_step = 1 * magnitude
    elif residual <= 2:
        nice_step = 2 * magnitude
    elif residual <= 5:
        nice_step = 5 * magnitude
    else:
        nice_step = 10 * magnitude
    start = math.floor(y_min / nice_step) * nice_step
    ticks = []
    value = start
    while value <= y_max + nice_step * 0.5:
        if value >= y_min - nice_step * 0.5:
            ticks.append(round(value, 10))
        value += nice_step
    return ticks


def value_to_y(value: float, y_min: float, y_max: float, top: int, bottom: int) -> float:
    if y_max == y_min:
        return float(bottom)
    return bottom - ((float(value) - y_min) / (y_max - y_min)) * (bottom - top)


def format_tick(value: float) -> str:
    if abs(value) >= 100:
        return f"{value:.0f}"
    if abs(value) >= 10:
        return f"{value:.1f}".rstrip("0").rstrip(".")
    return f"{value:.2f}".rstrip("0").rstrip(".")


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    font_names = [
        "arialbd.ttf" if bold else "arial.ttf",
        "calibrib.ttf" if bold else "calibri.ttf",
        "segoeuib.ttf" if bold else "segoeui.ttf",
    ]
    font_dirs = [Path(r"C:\Windows\Fonts"), Path("/usr/share/fonts/truetype/dejavu")]
    for directory in font_dirs:
        for name in font_names:
            candidate = directory / name
            if candidate.exists():
                return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def text_size(draw: ImageDraw.ImageDraw, text: str, text_font) -> tuple[int, int]:
    bbox = draw.textbbox((0, 0), text, font=text_font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    center_x: float,
    y: float,
    text_font,
    fill: str,
) -> None:
    width, _ = text_size(draw, text, text_font)
    draw.text((center_x - width / 2, y), text, font=text_font, fill=fill)


def draw_wrapped_centered_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    center_x: float,
    y: float,
    max_width: float,
    text_font,
    fill: str,
    line_spacing: int = 4,
) -> None:
    lines = wrap_text_to_width(draw, text, text_font, max_width)
    line_heights = [text_size(draw, line, text_font)[1] for line in lines]
    current_y = y
    for line, line_height in zip(lines, line_heights):
        draw_centered_text(draw, line, center_x, current_y, text_font, fill)
        current_y += line_height + line_spacing


def wrap_text_to_width(
    draw: ImageDraw.ImageDraw, text: str, text_font, max_width: float
) -> list[str]:
    lines: list[str] = []
    for forced_line in str(text).split("\n"):
        words = forced_line.split()
        current = ""
        for word in words:
            proposed = word if not current else f"{current} {word}"
            width, _ = text_size(draw, proposed, text_font)
            if width <= max_width or not current:
                current = proposed
            else:
                lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines or [""]


def draw_vertical_text(
    image: Image.Image,
    text: str,
    x: int,
    center_y: int,
    text_font,
    fill: str,
) -> None:
    dummy = Image.new("RGBA", (1, 1), (255, 255, 255, 0))
    dummy_draw = ImageDraw.Draw(dummy)
    text_width, text_height = text_size(dummy_draw, text, text_font)
    label = Image.new("RGBA", (text_width + 12, text_height + 12), (255, 255, 255, 0))
    label_draw = ImageDraw.Draw(label)
    label_draw.text((6, 6), text, font=text_font, fill=fill)
    rotated = label.rotate(90, expand=True)
    image.paste(rotated, (x, int(center_y - rotated.height / 2)), rotated)


def survey_construct_axis_label(group: str) -> str:
    if group.startswith("Task "):
        task, construct = group.split(": ", 1)
        if construct == "Flexibility / Controllability":
            return f"{task}\nFlexibility /\nControllability"
        if construct == "Recognition Rather Than Recall":
            return f"{task}\nRecognition\nRather Than Recall"
        if construct == "Visibility of System Status":
            return f"{task}\nVisibility of\nSystem Status"
        return f"{task}\n{construct}"
    return group


def task_sort_key(value: object) -> tuple[int, str]:
    text = str(value)
    if text.isdigit():
        return int(text), text
    return 999, text


def build_report(
    behavioral_summary: pd.DataFrame,
    survey_summary: pd.DataFrame,
    outlier_report: pd.DataFrame,
    paired_data: pd.DataFrame,
    behavioral_pair_notes: list[dict[str, object]],
    survey_pair_notes: list[dict[str, object]],
) -> str:
    behavioral_findings = summarize_findings(behavioral_summary, "metric")
    survey_findings = summarize_findings(survey_summary, "construct")
    outlier_summary = summarize_outliers(outlier_report)
    participant_counts = paired_data.groupby(["measure_type"]).size().to_dict()

    lines: list[str] = []
    lines.append("# Korail Prototype A/B Usability Study Statistical Analysis")
    lines.append("")
    lines.append("## 1. Study Design Summary")
    lines.append("")
    lines.append(
        "This analysis evaluates a within-subject A/B usability study comparing Variant A, the original Korail UI, with Variant B, the redesigned Korail UI."
    )
    lines.append(
        "Because each participant could experience both variants, all inferential tests use paired participant-level comparisons."
    )
    lines.append(
        "The main analysis uses the TaskSummary and SurveyResponses sheets. EventLogs are not used for the main statistical tests."
    )
    lines.append("")
    lines.append("## 2. Hypotheses")
    lines.append("")
    lines.append("For behavioral metrics:")
    lines.append("")
    lines.append("- H0: There is no difference between Variant A and Variant B.")
    lines.append("- H1: Variant B improves performance compared with Variant A.")
    lines.append("- Completion time: Variant B leads to shorter task completion time.")
    lines.append("- Click count: Variant B leads to fewer clicks.")
    lines.append("- Misclick count: Variant B leads to fewer misclicks.")
    lines.append("- Page transition count: Variant B leads to fewer page transitions.")
    lines.append("")
    lines.append("For survey scores:")
    lines.append("")
    lines.append("- H0: There is no difference in perceived usability between Variant A and Variant B.")
    lines.append("- H1: Variant B leads to higher perceived usability scores than Variant A.")
    lines.append("")
    lines.append("## 3. Statistical Method")
    lines.append("")
    lines.append(
        "Behavioral improvements are computed as A minus B, so positive values favor Variant B. Survey improvements are computed as B minus A, so positive values favor Variant B."
    )
    lines.append(
        "For each task and metric or construct, participant-level paired A and B values were created by participantId."
    )
    lines.append(
        "Two-sided paired tests were used with alpha = 0.05. If Shapiro-Wilk p >= 0.05, a paired t-test was used. If Shapiro-Wilk p < 0.05, a Wilcoxon signed-rank test was used."
    )
    lines.append("")
    lines.append("## 4. Normality Test Explanation")
    lines.append("")
    lines.append(
        "Normality was tested on the paired improvement values, not on raw Variant A or Variant B values separately. This is the correct assumption check for a paired design because the test is about the distribution of within-participant differences."
    )
    lines.append("")
    lines.append("## 5. Behavioral Metrics Results")
    lines.append("")
    lines.extend(markdown_summary_table(behavioral_summary, "metric"))
    lines.append("")
    lines.append(behavioral_findings)
    lines.append("")
    lines.append("Behavioral figures:")
    lines.append("")
    lines.append("- behavioral_completion_time_boxplot.png")
    lines.append("- behavioral_click_count_boxplot.png")
    lines.append("- behavioral_misclick_count_boxplot.png")
    lines.append("- behavioral_page_transition_count_boxplot.png")
    lines.append("- behavioral_metrics_mean_barplots.png")
    lines.append("- paired_completion_time_plot.png")
    lines.append("")
    lines.append("## 6. Survey Construct Results")
    lines.append("")
    lines.extend(markdown_summary_table(survey_summary, "construct"))
    lines.append("")
    lines.append(survey_findings)
    lines.append("")
    lines.append("Survey figures:")
    lines.append("")
    lines.append("- survey_construct_score_boxplot.png")
    lines.append("- survey_construct_mean_barplot.png")
    lines.append("- paired_survey_score_plot.png")
    lines.append("")
    lines.append("## 7. Effect Size Interpretation")
    lines.append("")
    lines.append(
        "For paired t-tests, Cohen's dz was computed as the mean paired improvement divided by the standard deviation of paired improvements."
    )
    lines.append(
        "Cohen's dz is interpreted using common thresholds: 0.2 is small, 0.5 is medium, and 0.8 or higher is large."
    )
    lines.append(
        "For Wilcoxon signed-rank tests, matched-pairs rank-biserial correlation was reported. Positive effect sizes favor Variant B, while negative effect sizes favor Variant A."
    )
    lines.append("")
    lines.append("## 8. Outlier Summary")
    lines.append("")
    lines.append(outlier_summary)
    lines.append("")
    lines.append(
        "Outliers were flagged with the IQR rule within each task, variant, and metric or construct group. They were not removed from the main analysis."
    )
    lines.append("")
    lines.append("## 9. Suggested Interpretation for HCI Presentation")
    lines.append("")
    lines.append(make_hci_interpretation(behavioral_summary, survey_summary))
    lines.append("")
    lines.append("## 10. Limitations")
    lines.append("")
    lines.append("- The analysis is based on prototype experiment logs and should be interpreted in that context.")
    lines.append("- Paired tests account for participant-level matching but do not by themselves remove possible order or learning effects.")
    lines.append("- Outliers were retained, which preserves the original data but can influence means and paired tests.")
    lines.append("- Shapiro-Wilk tests can be sensitive to sample size; the selected test follows the specified decision rule.")
    lines.append("- Survey construct scores are averages of the specified items and assume those items validly represent each construct.")
    lines.append("")
    lines.append("## Analysis Coverage")
    lines.append("")
    lines.append(
        f"Participant-level behavioral paired rows: {participant_counts.get('behavioral', 0)}. Participant-level survey paired rows: {participant_counts.get('survey', 0)}."
    )
    lines.append(
        f"Behavioral comparison pairing notes: {format_pair_notes(behavioral_pair_notes, 'metric')}"
    )
    lines.append(f"Survey comparison pairing notes: {format_pair_notes(survey_pair_notes, 'construct')}")
    lines.append("")
    return "\n".join(lines)


def markdown_summary_table(summary: pd.DataFrame, label_column: str) -> list[str]:
    display = summary.copy()
    if display.empty:
        return ["No results were available."]

    if label_column == "metric":
        display[label_column] = display[label_column].map(metric_display_name)
        header = "| Task | Metric | N | A Mean | B Mean | Mean Improvement | Test | p-value | Effect Size | Significant | Better Variant |"
        separator = "|---|---:|---:|---:|---:|---:|---|---:|---:|---|---|"
    else:
        header = "| Task | Construct | N | A Mean | B Mean | Mean Improvement | Test | p-value | Effect Size | Significant | Better Variant |"
        separator = "|---|---|---:|---:|---:|---:|---|---:|---:|---|---|"

    rows = [header, separator]
    for _, row in display.iterrows():
        rows.append(
            "| "
            + " | ".join(
                [
                    f"Task {row['taskId']}",
                    str(row[label_column]),
                    str(int(row["n"])),
                    format_number(row["A_mean"]),
                    format_number(row["B_mean"]),
                    format_number(row["mean_improvement"]),
                    str(row["test_used"]),
                    format_p(row["p_value"]),
                    format_number(row["effect_size"]),
                    str(row["significant"]),
                    str(row["better_variant"]),
                ]
            )
            + " |"
        )
    return rows


def summarize_findings(summary: pd.DataFrame, label_column: str) -> str:
    if summary.empty:
        return "No paired comparisons were available."
    significant = summary[summary["significant"] == "Yes"]
    if significant.empty:
        return "No comparison reached statistical significance at p < 0.05."
    statements = []
    for _, row in significant.iterrows():
        label = metric_display_name(row[label_column]) if label_column == "metric" else row[label_column]
        direction = "favored Variant B" if row["mean_improvement"] > 0 else "favored Variant A"
        statements.append(
            f"Task {row['taskId']} {label} was statistically significant and {direction} ({format_p_sentence(row['p_value'])})."
        )
    return " ".join(statements)


def summarize_outliers(outlier_report: pd.DataFrame) -> str:
    if outlier_report.empty:
        return "No IQR outliers were flagged."
    counts = (
        outlier_report.groupby("metric")
        .size()
        .reset_index(name="count")
        .sort_values(["count", "metric"], ascending=[False, True])
    )
    parts = [f"{row['metric']}: {int(row['count'])}" for _, row in counts.iterrows()]
    return f"{len(outlier_report)} IQR outlier rows were flagged. Counts by metric or construct: " + "; ".join(parts) + "."


def make_hci_interpretation(behavioral_summary: pd.DataFrame, survey_summary: pd.DataFrame) -> str:
    all_results = []
    for _, row in behavioral_summary.iterrows():
        all_results.append(("behavioral", metric_display_name(row["metric"]), row))
    for _, row in survey_summary.iterrows():
        all_results.append(("survey", row["construct"], row))

    significant_b = [
        (kind, label, row)
        for kind, label, row in all_results
        if row["significant"] == "Yes" and row["mean_improvement"] > 0
    ]
    significant_a = [
        (kind, label, row)
        for kind, label, row in all_results
        if row["significant"] == "Yes" and row["mean_improvement"] < 0
    ]

    if not significant_b and not significant_a:
        return (
            "The results do not provide statistically significant evidence that Variant B outperformed Variant A on the tested metrics. "
            "For the presentation, emphasize observed directions and descriptive patterns, but avoid claiming a statistically reliable improvement."
        )

    statements = []
    if significant_b:
        b_items = [
            f"Task {row['taskId']} {label}" for _, label, row in significant_b
        ]
        statements.append(
            "Variant B showed statistically significant improvement for " + ", ".join(b_items) + "."
        )
    if significant_a:
        a_items = [
            f"Task {row['taskId']} {label}" for _, label, row in significant_a
        ]
        statements.append(
            "Variant A performed statistically better for " + ", ".join(a_items) + "."
        )
    statements.append(
        "For non-significant results, describe the observed direction as descriptive rather than conclusive."
    )
    return " ".join(statements)


def format_pair_notes(notes: list[dict[str, object]], label_key: str) -> str:
    if not notes:
        return "none"
    dropped = [note for note in notes if int(note.get("dropped_participants", 0)) > 0]
    if not dropped:
        return "all comparisons retained all available paired participants"
    return "; ".join(
        f"Task {note['taskId']} {note[label_key]} dropped {note['dropped_participants']} participant(s)"
        for note in dropped
    )


def metric_display_name(metric: str) -> str:
    for spec in BEHAVIORAL_METRICS:
        if spec["metric"] == metric:
            return spec["label"]
    return metric


def format_number(value: object) -> str:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return ""
    if not np.isfinite(number):
        return ""
    return f"{number:.3f}"


def format_p(value: object) -> str:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return ""
    if not np.isfinite(number):
        return ""
    if number < 0.001:
        return "< 0.001"
    return f"{number:.3f}"


def format_p_sentence(value: object) -> str:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return "p not available"
    if not np.isfinite(number):
        return "p not available"
    if number < 0.001:
        return "p < 0.001"
    return f"p = {number:.3f}"


def verify_outputs(output_dir: Path, behavioral_summary: pd.DataFrame, survey_summary: pd.DataFrame) -> None:
    expected_files = [
        "behavioral_statistics_summary.csv",
        "survey_statistics_summary.csv",
        "outlier_report.csv",
        "participant_level_paired_data.csv",
        "behavioral_completion_time_boxplot.png",
        "behavioral_click_count_boxplot.png",
        "behavioral_misclick_count_boxplot.png",
        "behavioral_page_transition_count_boxplot.png",
        "survey_construct_score_boxplot.png",
        "behavioral_metrics_mean_barplots.png",
        "survey_construct_mean_barplot.png",
        "paired_completion_time_plot.png",
        "paired_survey_score_plot.png",
        "statistical_analysis_report.md",
    ]
    missing = [name for name in expected_files if not (output_dir / name).exists()]
    if missing:
        raise RuntimeError(f"Missing expected output file(s): {', '.join(missing)}")
    if len(behavioral_summary) != 12:
        raise RuntimeError(f"Expected 12 behavioral comparisons, found {len(behavioral_summary)}")
    if len(survey_summary) != 4:
        raise RuntimeError(f"Expected 4 survey comparisons, found {len(survey_summary)}")
    scan_generated_text_for_hangul(output_dir)


def scan_generated_text_for_hangul(output_dir: Path) -> None:
    text_files = [
        "behavioral_statistics_summary.csv",
        "survey_statistics_summary.csv",
        "outlier_report.csv",
        "participant_level_paired_data.csv",
        "statistical_analysis_report.md",
    ]
    for name in text_files:
        text = (output_dir / name).read_text(encoding="utf-8")
        if contains_hangul(text):
            raise RuntimeError(f"Generated text contains Korean characters: {name}")


def contains_hangul(text: str) -> bool:
    return any("\uac00" <= char <= "\ud7af" or "\u1100" <= char <= "\u11ff" for char in text)


def print_console_summary(
    behavioral_summary: pd.DataFrame,
    survey_summary: pd.DataFrame,
    outlier_report: pd.DataFrame,
    paired_data: pd.DataFrame,
) -> None:
    behavior_n = sorted(behavioral_summary["n"].dropna().astype(int).unique().tolist())
    survey_n = sorted(survey_summary["n"].dropna().astype(int).unique().tolist())
    sig_behavior = behavioral_summary[behavioral_summary["significant"] == "Yes"]
    sig_survey = survey_summary[survey_summary["significant"] == "Yes"]
    print("Korail paired A/B usability analysis complete.")
    print(f"Behavioral comparisons: {len(behavioral_summary)}; participant counts: {behavior_n}.")
    print(f"Survey construct comparisons: {len(survey_summary)}; participant counts: {survey_n}.")
    print(f"Participant-level paired rows: {len(paired_data)}.")
    print(f"IQR outlier rows flagged and retained: {len(outlier_report)}.")
    print(f"Statistically significant behavioral comparisons: {len(sig_behavior)}.")
    print(f"Statistically significant survey comparisons: {len(sig_survey)}.")
    print(f"Outputs saved to: {DEFAULT_OUTPUT_DIR}")


if __name__ == "__main__":
    main()
