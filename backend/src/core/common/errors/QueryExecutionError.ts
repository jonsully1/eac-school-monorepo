interface QueryExecutionError extends Error {
  name: "QueryExecutionError";
}

export const QueryExecutionError = (msg: string) => {
  const error = new Error(msg) as QueryExecutionError;
  error.name = "QueryExecutionError";
  return error;
};
