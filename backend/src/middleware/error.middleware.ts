import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { sendError } from "../utils/response";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { config } from "../config/env";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.message);
    return;
  }

  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const key = issue.path.join(".");
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key].push(issue.message);
    }
    sendError(res, 422, "Validation failed", errors);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[]) || [];
      sendError(res, 409, `Duplicate value for: ${target.join(", ")}`);
      return;
    }
    if (err.code === "P2025") {
      sendError(res, 404, "Resource not found");
      return;
    }
  }

  if (config.nodeEnv === "development") {
    console.error("Unhandled error:", err);
  }

  sendError(res, 500, "Internal server error");
}
