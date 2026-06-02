import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { sendError } from "../utils/response";

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        for (const issue of error.issues) {
          const key = issue.path.join(".");
          if (!errors[key]) {
            errors[key] = [];
          }
          errors[key].push(issue.message);
        }
        sendError(res, 422, "Validation failed", errors);
        return;
      }
      next(error);
    }
  };
}
