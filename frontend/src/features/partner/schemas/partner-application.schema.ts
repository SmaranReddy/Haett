import { z } from 'zod';

export const partnerTypeOptions = [
  { value: 'individual', label: 'Individual / Sole Proprietor' },
  { value: 'business', label: 'Business / Company' },
  { value: 'influencer', label: 'Content Creator / Influencer' },
  { value: 'agency', label: 'Agency / Network' },
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
