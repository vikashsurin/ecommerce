import type { ContentfulStatusCode } from "hono/utils/http-status"

type ErrorCode =
  | "not_found"
  | "unauthorized"
  | "forbidden"
  | "conflict"
  | "validation_error"
  | "internal_server_error"

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public status: ContentfulStatusCode
  ) {
    super(message)
    this.name = "AppError"
  }

  static notFound(message = "Resource not found") {
    return new AppError("not_found", message, 404)
  }

  static unauthorized(message = "Unauthorized") {
    return new AppError("unauthorized", message, 401)
  }

  static forbidden(message = "Forbidden") {
    return new AppError("forbidden", message, 403)
  }

  static validation(message: string) {
    return new AppError("validation_error", message, 400)
  }

  static conflict(message = "Resource already exists") {
    return new AppError("conflict", message, 409)
  }

  static internal(message = "Internal server error") {
    return new AppError("internal_server_error", message, 500)
  }
}
