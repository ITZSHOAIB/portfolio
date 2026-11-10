export type Problem = {
  /** Path relative to the project root, with forward slashes. */
  file: string;
  /** The field or entry inside the file, when there is one. */
  field?: string;
  /** What is wrong and what to do about it. */
  message: string;
};

export const formatProblem = ({ file, field, message }: Problem) =>
  `${file}: ${field ? `${field} ` : ""}${message}`;
