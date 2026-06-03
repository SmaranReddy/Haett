import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, RotateCcw, Building2 } from 'lucide-react';
import { Button, Input, Select, Textarea, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { partnerApplicationSchema, partnerTypeOptions, type PartnerApplicationFormValues } from '@/features/partner/schemas/partner-application.schema';
import { useCreateApplication, useReapply } from '@/hooks/use-partner';
import { getApiError } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';

interface ApplicationFormViewProps {
  isReapply?: boolean;
  onSuccess?: () => void;
  existingApplication?: {
    partnerType: string;
    businessName: string;
    phone: string;
    socialLink: string | null;
    audienceSize: number;
    description: string | null;
  };
}

function mapFormToRequest(values: PartnerApplicationFormValues) {
  return {
    partnerType: values.partnerType,
    businessName: values.businessName,
    phone: values.phone || '',
    socialLink: values.socialLink || undefined,
    audienceSize: values.audienceSize ? parseInt(values.audienceSize, 10) : undefined,
    description: values.description || undefined,
  };
}

export function ApplicationFormView({ isReapply = false, onSuccess, existingApplication }: ApplicationFormViewProps) {
  const user = useAuthStore((s) => s.user);
  const createMutation = useCreateApplication();
  const reapplyMutation = useReapply();
  const mutation = isReapply ? reapplyMutation : createMutation;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PartnerApplicationFormValues>({
    resolver: zodResolver(partnerApplicationSchema),
    mode: 'onChange',
    defaultValues: {
      partnerType: existingApplication?.partnerType ?? '',
      businessName: existingApplication?.businessName ?? '',
      phone: existingApplication?.phone ?? '',
      socialLink: existingApplication?.socialLink ?? '',
      audienceSize: existingApplication?.audienceSize ? String(existingApplication.audienceSize) : '',
      description: existingApplication?.description ?? '',
    },
  });

  const descriptionValue = watch('description');

  const onSubmit = async (values: PartnerApplicationFormValues) => {
    setSubmitError(null);
    mutation.mutate(mapFormToRequest(values), {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        setSubmitError(getApiError(error));
      },
    });
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand-200/20 to-brand-400/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-200/10 to-brand-300/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center relative"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/20">
          {isReapply ? <RotateCcw className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {isReapply ? 'Update Your Application' : 'Become a Partner'}
        </h1>
        <p className="mt-2 text-gray-500">
          {isReapply
            ? 'Submit an updated application for review'
            : `Welcome${user ? `, ${user.name}` : ''}! Fill out the form below to get started.`
          }
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full"
      >
        <Card padding="lg" variant="glass-strong" className="w-full">
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              All fields marked with an asterisk are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-label="Partner application form">
              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  label="Partner Type *"
                  placeholder="Select your partner type"
                  options={partnerTypeOptions.map((o) => ({ value: o.value, label: o.label }))}
                  error={errors.partnerType?.message}
                  {...register('partnerType')}
                />

                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <Input
                label="Business Name *"
                placeholder="Your business or brand name"
                error={errors.businessName?.message}
                {...register('businessName')}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Social Link"
                  type="url"
                  placeholder="https://instagram.com/your-profile"
                  error={errors.socialLink?.message}
                  {...register('socialLink')}
                />

                <Input
                  label="Audience Size"
                  type="number"
                  placeholder="e.g. 10000"
                  min={1}
                  error={errors.audienceSize?.message}
                  {...register('audienceSize')}
                />
              </div>

              <div className="space-y-1.5">
                <Textarea
                  label="Description"
                  placeholder="Tell us about your platform and audience..."
                  className="resize-none min-h-[120px]"
                  maxLength={500}
                  rows={4}
                  error={errors.description?.message}
                  {...register('description')}
                />
                <div className="flex justify-end">
                  <span className={cn(
                    'text-xs tabular-nums',
                    (descriptionValue ?? '').length > 450 ? 'text-amber-500' : 'text-gray-400',
                    (descriptionValue ?? '').length >= 500 ? 'text-red-500' : '',
                  )}>
                    {(descriptionValue ?? '').length}/500
                  </span>
                </div>
              </div>

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="rounded-lg border border-red-200 bg-red-50/50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  {submitError}
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!isValid}
                isLoading={mutation.isPending}
              >
                {isReapply ? (
                  <><RotateCcw className="h-4 w-4 mr-1.5" /> Resubmit Application</>
                ) : (
                  <><Send className="h-4 w-4 mr-1.5" /> Submit Application</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
