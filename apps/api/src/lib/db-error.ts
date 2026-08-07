import { AppError } from "./app-error"

// Postgres error codes: https://www.postgresql.org/docs/current/errcodes-appendix.html
const PG_UNIQUE_VIOLATION = "23505"
const PG_FOREIGN_KEY_VIOLATION = "23503"
const PG_NOT_NULL_VIOLATION = "23502"

export function toAppError(
  error: unknown,
  context?: { entity?: string }
): never {
  const code = (error as { code?: string })?.code

  if (code === PG_UNIQUE_VIOLATION) {
    throw AppError.conflict(`${context?.entity ?? "Resource"} already exists`)
  }
  if (code === PG_FOREIGN_KEY_VIOLATION) {
    throw AppError.validation(
      `Referenced ${context?.entity ?? "resource"} does not exist`
    )
  }
  if (code === PG_NOT_NULL_VIOLATION) {
    throw AppError.validation("Missing required field")
  }

  // Unknown DB error — rethrow as-is, let onError log it and return 500
  throw error
}
