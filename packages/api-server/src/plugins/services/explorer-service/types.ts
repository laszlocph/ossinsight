import {DateTime} from "luxon";
import {Field} from "../../../core/executor/query-executor/QueryExecutor";
import {Answer, AnswerSummary, RecommendedChart} from "../bot-service/types";

export enum QuestionQueueNames {
    High = "explorer_high_concurrent_queue",
    Low = "explorer_low_concurrent_queue",
}

export interface Question {
  id: string;
  hash: string;
  userId: number;
  status: QuestionStatus;
  title: string;
  revisedTitle?: string;
  sqlCanAnswer?: boolean;
  notClear?: string;
  assumption?: string;
  combinedTitle?: string;
  querySQL?: string;
  queryHash?: string;
  engines?: string[];
  queueName?: QuestionQueueNames;
  queueJobId?: string | null;
  recommendedQuestions?: string[];
  result?: QuestionSQLResult;
  chart?: RecommendedChart | null;
  answer?: Answer | null;
  answerSummary?: AnswerSummary;
  batchJobId: string | null;
  needReview: boolean;
  recommended: boolean;
  createdAt: DateTime;
  requestedAt?: DateTime | null;
  executedAt?: DateTime | null;
  finishedAt?: DateTime | null;
  spent?: number | null;
  error?: string | null;
  errorType?: QuestionFeedbackType | null;
  hitCache: boolean;
  preceding: number;
  [key: string]: any
}

export interface QuestionSQLResult {
  fields: Field[];
  rows: any[];
}

export interface QuestionQueryResult {
  result: QuestionSQLResult;
  executedAt: DateTime;
  finishedAt: DateTime;
  spent: number;
}

export interface QuestionQueryResultWithChart extends QuestionQueryResult {
  chart: RecommendedChart;
}

export enum QuestionStatus {
  New = "new",
  AnswerGenerating = "answer_generating",
  SQLValidating = "sql_validating",
  Waiting = "waiting",
  Running = "running",
  Summarizing = "summarizing",
  Success = "success",
  Error = "error",
  Cancel = "cancel",
}

export interface PlanStep {
  id: number;
  estRows: number;
  actRows?: number;
  task: string;
  accessObject: string;
}

export interface ValidateSQLResult {
  sql: string;
  statementType: string;
}

export interface QuestionFeedback {
  id: number;
  userId: number;
  questionId: string;
  satisfied: boolean;
  feedbackType: QuestionFeedbackType;
  feedbackContent?: string;
  createdAt: DateTime;
}

export enum QuestionFeedbackType {
  AnswerSatisfied = "answer-satisfied",
  AnswerUnsatisfied = "answer-unsatisfied",
  ErrorSQLCanNotAnswer = "error-sql-can-not-answer",
  ErrorAnswerGenerate = "error-answer-generate",
  ErrorAnswerParse = "error-answer-parse",
  ErrorValidateSQL = "error-validate-sql",
  ErrorValidateChart = "error-validate-chart",
  ErrorQueryExecute = "error-query-execute",
  ErrorQueryTimeout = "error-query-timeout",
  ErrorEmptyResult = "error-empty-result",
  ErrorSummaryGenerate = "error-summary-generate",
  ErrorUnknown = "error-unknown",
}