import sc from "../../utils/statusCodes";
// Use these to specify behavior of custom error handler middleware

const getNameAndValue = <T = string>(obj: {
  [key: string]: T;
}): [string, T] => {
  const name = Object.keys(obj)[0];
  const value = obj[name];
  return [name, value];
};
export class AppError extends Error {
  statusCode: number;
  constructor(
    message = "Internal server error",
    statusCode = 500,
    name = "AppError"
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class EmptyFieldError extends AppError {
  constructor(obj: { [key: string]: any }) {
    const propName = Object.keys(obj)[0];
    const message = `Empty field: ${propName}`;
    super(message, 400, "EmptyFieldError");
  }
}

export class WrongTypeError extends AppError {
  constructor(obj: { [key: string]: unknown }, expType: string) {
    const [propName, propVal] = getNameAndValue(obj);
    const message = `Expected ${propName} to be a ${expType} instead of a ${typeof propVal}`;
    super(message, 400, "WrongTypeError");
  }
}

export class RecordNotFoundError extends AppError {
  constructor(recordId: string) {
    super(
      `Record with id='${recordId}' was not found`,
      sc.NOT_FOUND,
      "RecordNotFoundError"
    );
  }
}

export class CannotBeNegativeError extends AppError {
  constructor(obj: { [key: string]: number }) {
    const [propName, propVal] = getNameAndValue(obj);
    super(
      `'${propName}' cannot be negative. Got ${propVal}`,
      sc.BAD_REQUEST,
      "CannotBeNegativeError"
    );
  }
}

export class CannotBeGreaterError extends AppError {
  constructor(obj: { [key: string]: number }, topLimit: number) {
    const [propName, propVal] = getNameAndValue(obj);
    super(
      `'${propName}' cannot be greater than ${topLimit}. Instead received ${propVal}`,
      sc.BAD_REQUEST,
      "CannotBeGreaterError"
    );
  }
}
