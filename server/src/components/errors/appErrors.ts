// Use these to specify behavior of custom error handler middleware
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
  constructor(propName: string) {
    const message = `Empty field: ${propName}`;
    super(message, 400, "EmptyFieldError");
  }
}

export class WrongTypeError extends AppError {
  constructor(propName: string, prop: unknown, expType: string) {
    const message = `Expected ${propName} to be a ${expType} instead of a ${typeof prop}`;
    super(message, 400, "WrongTypeError");
  }
}

//   export class MovieNotFoundError extends Error {
//     constructor(movieId) {
//       super();
//       this.name = "MovieNotFound";
//       this.message = `Movie with id=${movieId} is not found`;
//       this.statusCode = 404;
//     }
//   }

//   export class MissingPropError extends Error {
//     constructor(propName) {
//       super();
//       this.name = "MissingPropError";
//       this.message = `Property ${propName} is missing`;
//       this.statusCode = 400;
//     }
//   }
