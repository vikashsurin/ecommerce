import type { ContentfulStatusCode } from "hono/utils/http-status";

type ErrorCode =
  | "not_found"
  | "unauthorized"
  | "forbidden"
  | "conflict"
  | "validation_error"
  | "internal_server_error";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: ContentfulStatusCode;

  constructor(
    code: ErrorCode,
    message: string,
    status: ContentfulStatusCode,
    options?: ErrorOptions, // supports `cause`
  ) {
    super(message, options);
    this.name = "AppError";
    this.code = code;
    this.status = status;
  }

  // Factories return the instance (standard, flexible)
  static notFound(message = "Resource not found", options?: ErrorOptions) {
    return new AppError("not_found", message, 404, options);
  }

  static unauthorized(message = "Unauthorized", options?: ErrorOptions) {
    return new AppError("unauthorized", message, 401, options);
  }

  static forbidden(message = "Forbidden", options?: ErrorOptions) {
    return new AppError("forbidden", message, 403, options);
  }

  static validation(message: string, options?: ErrorOptions) {
    return new AppError("validation_error", message, 400, options);
  }

  static conflict(message = "Resource already exists", options?: ErrorOptions) {
    return new AppError("conflict", message, 409, options);
  }

  static internal(message = "Internal server error", options?: ErrorOptions) {
    return new AppError("internal_server_error", message, 500, options);
  }

  /** Map common Postgres errors → AppError and throw */
  static fromPg(error: unknown, context?: { entity?: string }): never {
    const code = (error as { code?: string })?.code;
    const entity = context?.entity ?? "Resource";

    if (code === "23505") {
      throw AppError.conflict(`${entity} already exists`, { cause: error });
    }
    if (code === "23503") {
      throw AppError.validation(
        `Referenced ${entity.toLowerCase()} does not exist`,
        { cause: error },
      );
    }
    if (code === "23502") {
      throw AppError.validation("Missing required field", { cause: error });
    }

    // Unknown DB error — rethrow original so onError can log it as 500
    throw error;
  }
}
