# Pagination API Challenge
An API for accessing a seeeded data set of apps that returns paginated, JSON-format app data according to user queries. 

## Range Format 

#### Parameters


Making a `GET` request on the `/apps` endpoint  

\begin{table}[]
\begin{tabular}{|l|l|l|}
\hline
\textbf{Param} & \textbf{Required?} & \textbf{Valid Values}                                                                                      \\ \hline
by             & yes                & id, name                                                                                                   \\ \hline
start          & no                 & Any \# within the data set if ordering by id, or a name of any app within the data set if ordering by name \\ \hline
end            & no                 &                                                                                                            \\ \hline
max            & no                 &                                                                                                            \\ \hline
order          & no                 & asc, desc                                                                                                  \\ \hline
\end{tabular}
\end{table}

- Paramaters 
  - required/not
  - expected response
  - defaults

## Usage

## How It Works
