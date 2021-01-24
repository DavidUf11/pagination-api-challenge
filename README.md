# Pagination API Challenge
An API for accessing a seeeded data set of apps that returns paginated, JSON-format app data according to user queries. 

## Range Format 

#### Parameters


Making a `GET` request on the `/apps` endpoint 

| Column 1       | Column 2     | Column 3     |
| :------------- | :----------: | -----------: |
|  Cell Contents | More Stuff   | And Again    |
| You Can Also   | Put Pipes In | Like this \| |

% Please add the following required packages to your document preamble:
% \usepackage{booktabs}
\begin{table}[]
\begin{tabular}{@{}lll@{}}
\toprule
\textbf{Param}              & \textbf{Required?}       & \textbf{Valid Values}                                                                                                           \\ \midrule
\multicolumn{1}{|l|}{by}    & \multicolumn{1}{l|}{yes} & \multicolumn{1}{l|}{id, name}                                                                                                   \\ \midrule
\multicolumn{1}{|l|}{start} & \multicolumn{1}{l|}{no}  & \multicolumn{1}{l|}{Any \# within the data set if ordering by id, or a name of any app within the data set if ordering by name} \\ \midrule
\multicolumn{1}{|l|}{end}   & \multicolumn{1}{l|}{no}  & \multicolumn{1}{l|}{}                                                                                                           \\ \midrule
\multicolumn{1}{|l|}{max}   & \multicolumn{1}{l|}{no}  & \multicolumn{1}{l|}{}                                                                                                           \\ \midrule
order                       & no                       & asc, desc                                                                                                                       \\ \bottomrule
\end{tabular}
\end{table}
- Paramaters 
  - required/not
  - expected response
  - defaults

## Usage

## How It Works
