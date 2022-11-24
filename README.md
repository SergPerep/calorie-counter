# Error handling

## Custom errors

I define custom errors in [appErrors.ts](/src/components/errors/appErrors.ts).

I create an `AppError` class and use it as super generic error object for my application. Why don't I use just `Error`? Cause I want the generic error to hold status codes.

Then I use `AppError` to create more specific error classes, if I am sure that I will use them again and again. For example, I use `EmptyFieldError` every time when I check objects for properties.

## Throwing errors

Check [recordsAPI.ts](/src/components/records/recordsAPI.ts) to see how I throw these errors.

If I use `trycatch`, in a catch statement I always put an error inside `next()`. That way it is always going to be caught by `handleError` middleware.

```javascript
catch (error) {
    next(error);
}
```

## Handle errors with middleware

[handleErrors.ts](/src/components/errors/handleErrors.ts) – is a typical express error handler middleware, since it takes an `error` as a first argument. It's going to catch any error passed to the `next()` as an argument.

[→ Check express guide: Writing error handlers](https://expressjs.com/en/guide/error-handling.html#writing-error-handlers) for more information about express error handler middleware

`handleErrors` is mounted the last in [app.ts](/src/app.ts), so that it would be able to catch errors after controllers throw them.

Inside this middleware you can check caught `Error` for `error name` or `status code` and decide what to do with it depending on these values.

## Life circle of an Error

Let's go to the life circle of an error.

1. Throw an error some where

    ```javascript
    if (typeof dateStr !== "string")
          throw new WrongTypeError({ date: dateStr }, "string");
    ```

1. Catch-statement catches this error and sends it to the `next()`

    ```javascript
    catch (error) {
        next(error);
    }
    ```

1. `handleError` (error handler middleware) gets this error and decides what to do with it depending in its `name` or/and `status code`: logs it or/and sends appropriate response.  
