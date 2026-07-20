import { zValidator } from "@hono/zod-validator";
import { type ValidationTargets } from "hono";
import { ZodType } from "zod";

// let cycle = 0;

export const validate = <
  T extends ZodType,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T,
) => {
  return zValidator(target, schema, (result, ctx) => {
    // console.info(`#ZodValidation_${cycle++}`, result);

    if (!result.success) {
      console.info(`#ZodValidationError`, result);
      return ctx.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error._zod.def,
        },
        400,
      );
    }
  });
};
