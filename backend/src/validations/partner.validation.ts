import { z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    partnerType: z.string().min(1, "Partner type is required"),
    businessName: z
      .string()
      .min(1, "Business name is required")
      .max(200, "Business name must be at most 200 characters"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(30, "Phone number must be at most 30 characters"),
    socialLink: z
      .string()
      .url("Invalid URL")
      .max(500, "Social link must be at most 500 characters")
      .optional()
      .or(z.literal("")),
    audienceSize: z
      .number()
      .int("Audience size must be a whole number")
      .min(0, "Audience size cannot be negative")
      .max(100_000_000, "Audience size seems unrealistically large")
      .optional()
      .default(0),
    description: z
      .string()
      .max(500, "Description must be at most 500 characters")
      .optional(),
  }),
});

export const reapplySchema = z.object({
  body: z.object({
    partnerType: z.string().min(1, "Partner type is required"),
    businessName: z
      .string()
      .min(1, "Business name is required")
      .max(200, "Business name must be at most 200 characters"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(30, "Phone number must be at most 30 characters"),
    socialLink: z
      .string()
      .url("Invalid URL")
      .max(500, "Social link must be at most 500 characters")
      .optional()
      .or(z.literal("")),
    audienceSize: z
      .number()
      .int("Audience size must be a whole number")
      .min(0, "Audience size cannot be negative")
      .max(100_000_000, "Audience size seems unrealistically large")
      .optional()
      .default(0),
    description: z
      .string()
      .max(500, "Description must be at most 500 characters")
      .optional(),
  }),
});

export const rejectApplicationSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .min(10, "Reason must be at least 10 characters"),
  }),
});

export const statusQuerySchema = z.object({
  query: z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  }),
});

export const toggleCodeParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid discount code ID"),
  }),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>["body"];
export type ReapplyInput = z.infer<typeof reapplySchema>["body"];
export type RejectApplicationInput = z.infer<typeof rejectApplicationSchema>["body"];
