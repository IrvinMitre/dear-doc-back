class BaseError extends Error {
  public code: number;
  public status: number;
  public message: string;

  constructor(
    code: number,
    status = 500,
    message = 'Error processing the request',
  ) {
    super();
    this.code = code;
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, BaseError);
  }
}

export default BaseError;
