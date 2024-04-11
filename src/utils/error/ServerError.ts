export enum ServerErrorCause {
  UNKNOWN,

  // TODO: add known error types here
}

interface ErrorDetails {
  code: number;
  message: string;
  cause?: any;
}

export class ServerError extends Error {
  code: number;
  message: string;
  cause: any;

  constructor({ code, message, cause }: ErrorDetails) {
    super();
    this.code = code;
    this.message = message;
    this.cause = cause || ServerErrorCause.UNKNOWN;
  }
}
