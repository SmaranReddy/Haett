import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

export function ApplicationFormView({ isReapply = false, onSuccess }: ApplicationFormViewProps) {
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
      partnerType: '',
      businessName: '',
      phone: '',
      socialLink: '',
      audienceSize: '',
      description: '',
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
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {isReapply ? 'Update Your Application' : 'Become a Partner'}
        </h1>
        <p className="mt-2 text-gray-500">
          {isReapply
            ? 'Submit an updated application for review'
            : `Welcome${user ? `, ${user.name}` : ''}! Fill out the form below to get started.`
          }
        </p>
      </div>

      <Card padding="lg" className="w-full">
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
          <CardDescription>
            All fields marked with an asterisk are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-label="Partner application form">
            <Select
              label="Partner Type *"
              placeholder="Select your partner type"
              options={partnerTypeOptions.map((o) => ({ value: o.value, label: o.label }))}
              error={errors.partnerType?.message}
              {...register('partnerType')}
            />

            <Input
              label="Business Name *"
              placeholder="Your business or brand name"
              error={errors.businessName?.message}
              {...register('businessName')}
            />

            <Input
              label="Phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              error={errors.phone?.message}
              {...register('phone')}
            />

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

            <div className="space-y-1.5">
              <Textarea
                label="Description"
                placeholder="Tell us about your platform and audience..."
                className="resize-none min-h-[120px]"
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
              <div className="rounded-lg border border-red-200 bg-red-50/50 px-4 py-3 text-sm text-red-700" role="alert">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!isValid}
              isLoading={mutation.isPending}
            >
              {isReapply ? 'Resubmit Application' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
