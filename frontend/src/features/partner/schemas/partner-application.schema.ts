import { z } from 'zod';

export const partnerTypeOptions = [
  { value: 'affiliate', label: 'Affiliate' },
  { value: 'influencer', label: 'Influencer' },
  { value: 'gym', label: 'Gym' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'partner-associate', label: 'Partner Associate' },
] as const;

export const partnerApplicationSchema = z.object({
  partnerType: z.string().min(1, 'Partner type is required'),
  businessName: z
    .string()
    .min(1, 'Business name is required')
    .max(200, 'Business name must be at most 200 characters'),
  phone: z
    .string()
    .max(30, 'Phone number must be at most 30 characters')
    .optional(),
  socialLink: z
    .string()
    .url('Must be a valid URL')
    .max(500, 'Social link must be at most 500 characters')
    .optional()
    .or(z.literal('')),
  audienceSize: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => val === undefined || val === '' || /^\d+$/.test(val),
      'Must be a positive whole number',
    )
    .refine(
      (val) => val === undefined || val === '' || parseInt(val, 10) <= 100_000_000,
      'Audience size seems unrealistically large',
    ),
  description: z
    .string()
    .max(500, 'Description must be at most 500 characters')
    .optional(),
});

export type PartnerApplicationFormValues = z.infer<typeof partnerApplicationSchema>;
