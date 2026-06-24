# Korail Prototype A/B Usability Study Statistical Analysis

## 1. Study Design Summary

This analysis evaluates a within-subject A/B usability study comparing Variant A, the original Korail UI, with Variant B, the redesigned Korail UI.
Because each participant could experience both variants, all inferential tests use paired participant-level comparisons.
The main analysis uses the TaskSummary and SurveyResponses sheets. EventLogs are not used for the main statistical tests.

## 2. Hypotheses

For behavioral metrics:

- H0: There is no difference between Variant A and Variant B.
- H1: Variant B improves performance compared with Variant A.
- Completion time: Variant B leads to shorter task completion time.
- Click count: Variant B leads to fewer clicks.
- Misclick count: Variant B leads to fewer misclicks.
- Page transition count: Variant B leads to fewer page transitions.

For survey scores:

- H0: There is no difference in perceived usability between Variant A and Variant B.
- H1: Variant B leads to higher perceived usability scores than Variant A.

## 3. Statistical Method

Behavioral improvements are computed as A minus B, so positive values favor Variant B. Survey improvements are computed as B minus A, so positive values favor Variant B.
For each task and metric or construct, participant-level paired A and B values were created by participantId.
Two-sided paired tests were used with alpha = 0.05. If Shapiro-Wilk p >= 0.05, a paired t-test was used. If Shapiro-Wilk p < 0.05, a Wilcoxon signed-rank test was used.

## 4. Normality Test Explanation

Normality was tested on the paired improvement values, not on raw Variant A or Variant B values separately. This is the correct assumption check for a paired design because the test is about the distribution of within-participant differences.

## 5. Behavioral Metrics Results

| Task | Metric | N | A Mean | B Mean | Mean Improvement | Test | p-value | Effect Size | Significant | Better Variant |
|---|---:|---:|---:|---:|---:|---|---:|---:|---|---|
| Task 1 | Completion Time (seconds) | 40 | 26.014 | 12.360 | 13.655 | Wilcoxon signed-rank test | < 0.001 | 0.888 | Yes | Variant B |
| Task 1 | Click Count | 40 | 14.625 | 6.525 | 8.100 | Wilcoxon signed-rank test | < 0.001 | 0.866 | Yes | Variant B |
| Task 1 | Misclick Count | 40 | 3.525 | 1.075 | 2.450 | Wilcoxon signed-rank test | < 0.001 | 0.810 | Yes | Variant B |
| Task 1 | Page Transition Count | 40 | 9.475 | 5.475 | 4.000 | Wilcoxon signed-rank test | < 0.001 | 1.000 | Yes | Variant B |
| Task 2 | Completion Time (seconds) | 40 | 7.140 | 5.630 | 1.510 | Wilcoxon signed-rank test | 0.032 | 0.388 | Yes | Variant B |
| Task 2 | Click Count | 40 | 5.225 | 4.300 | 0.925 | Wilcoxon signed-rank test | 0.086 | 0.363 | No | Variant B |
| Task 2 | Misclick Count | 40 | 0.300 | 0.025 | 0.275 | Wilcoxon signed-rank test | 0.039 | 0.861 | Yes | Variant B |
| Task 2 | Page Transition Count | 40 | 5.025 | 4.425 | 0.600 | Wilcoxon signed-rank test | 0.079 | 0.423 | No | Variant B |
| Task 3 | Completion Time (seconds) | 40 | 14.572 | 9.135 | 5.436 | Paired t-test | < 0.001 | 0.805 | Yes | Variant B |
| Task 3 | Click Count | 40 | 10.250 | 5.775 | 4.475 | Paired t-test | < 0.001 | 1.345 | Yes | Variant B |
| Task 3 | Misclick Count | 40 | 0.775 | 0.250 | 0.525 | Wilcoxon signed-rank test | 0.008 | 0.684 | Yes | Variant B |
| Task 3 | Page Transition Count | 40 | 9.450 | 5.625 | 3.825 | Wilcoxon signed-rank test | < 0.001 | 0.913 | Yes | Variant B |

Task 1 Completion Time (seconds) was statistically significant and favored Variant B (p < 0.001). Task 1 Click Count was statistically significant and favored Variant B (p < 0.001). Task 1 Misclick Count was statistically significant and favored Variant B (p < 0.001). Task 1 Page Transition Count was statistically significant and favored Variant B (p < 0.001). Task 2 Completion Time (seconds) was statistically significant and favored Variant B (p = 0.032). Task 2 Misclick Count was statistically significant and favored Variant B (p = 0.039). Task 3 Completion Time (seconds) was statistically significant and favored Variant B (p < 0.001). Task 3 Click Count was statistically significant and favored Variant B (p < 0.001). Task 3 Misclick Count was statistically significant and favored Variant B (p = 0.008). Task 3 Page Transition Count was statistically significant and favored Variant B (p < 0.001).

Behavioral figures:

- behavioral_completion_time_boxplot.png
- behavioral_click_count_boxplot.png
- behavioral_misclick_count_boxplot.png
- behavioral_page_transition_count_boxplot.png
- behavioral_metrics_mean_barplots.png
- paired_completion_time_plot.png

## 6. Survey Construct Results

| Task | Construct | N | A Mean | B Mean | Mean Improvement | Test | p-value | Effect Size | Significant | Better Variant |
|---|---|---:|---:|---:|---:|---|---:|---:|---|---|
| Task 1 | Error Prevention | 40 | 3.756 | 4.650 | 0.894 | Paired t-test | < 0.001 | 0.587 | Yes | Variant B |
| Task 2 | Flexibility / Controllability | 40 | 3.833 | 5.250 | 1.417 | Paired t-test | < 0.001 | 1.029 | Yes | Variant B |
| Task 3 | Recognition Rather Than Recall | 40 | 3.342 | 5.425 | 2.083 | Paired t-test | < 0.001 | 1.665 | Yes | Variant B |
| Task 3 | Visibility of System Status | 40 | 3.292 | 5.417 | 2.125 | Paired t-test | < 0.001 | 1.543 | Yes | Variant B |

Task 1 Error Prevention was statistically significant and favored Variant B (p < 0.001). Task 2 Flexibility / Controllability was statistically significant and favored Variant B (p < 0.001). Task 3 Recognition Rather Than Recall was statistically significant and favored Variant B (p < 0.001). Task 3 Visibility of System Status was statistically significant and favored Variant B (p < 0.001).

Survey figures:

- survey_construct_score_boxplot.png
- survey_construct_mean_barplot.png
- paired_survey_score_plot.png

## 7. Effect Size Interpretation

For paired t-tests, Cohen's dz was computed as the mean paired improvement divided by the standard deviation of paired improvements.
Cohen's dz is interpreted using common thresholds: 0.2 is small, 0.5 is medium, and 0.8 or higher is large.
For Wilcoxon signed-rank tests, matched-pairs rank-biserial correlation was reported. Positive effect sizes favor Variant B, while negative effect sizes favor Variant A.

## 8. Outlier Summary

71 IQR outlier rows were flagged. Counts by metric or construct: misclickCount: 23; clickCount: 21; completionTimeSec: 14; pageTransitionCount: 9; Error Prevention: 3; Recognition Rather Than Recall: 1.

Outliers were flagged with the IQR rule within each task, variant, and metric or construct group. They were not removed from the main analysis.

## 9. Suggested Interpretation for HCI Presentation

Variant B showed statistically significant improvement for Task 1 Completion Time (seconds), Task 1 Click Count, Task 1 Misclick Count, Task 1 Page Transition Count, Task 2 Completion Time (seconds), Task 2 Misclick Count, Task 3 Completion Time (seconds), Task 3 Click Count, Task 3 Misclick Count, Task 3 Page Transition Count, Task 1 Error Prevention, Task 2 Flexibility / Controllability, Task 3 Recognition Rather Than Recall, Task 3 Visibility of System Status. For non-significant results, describe the observed direction as descriptive rather than conclusive.

## 10. Limitations

- The analysis is based on prototype experiment logs and should be interpreted in that context.
- Paired tests account for participant-level matching but do not by themselves remove possible order or learning effects.
- Outliers were retained, which preserves the original data but can influence means and paired tests.
- Shapiro-Wilk tests can be sensitive to sample size; the selected test follows the specified decision rule.
- Survey construct scores are averages of the specified items and assume those items validly represent each construct.

## Analysis Coverage

Participant-level behavioral paired rows: 480. Participant-level survey paired rows: 160.
Behavioral comparison pairing notes: all comparisons retained all available paired participants
Survey comparison pairing notes: all comparisons retained all available paired participants
