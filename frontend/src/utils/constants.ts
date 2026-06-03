export const APP_NAME = 'Partner Portal';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  PARTNER: '/partner',
  PARTNER_DASHBOARD: '/dashboard',
  PARTNER_APPLICATION: '/application',
  PARTNER_CODES: '/codes',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_APPLICATIONS: '/admin/applications',
  ADMIN_CODES: '/admin/codes',
  ADMIN_CODES_OLD: '/admin/discount-codes',
} as const;

export const QUERY_KEYS = {
  DASHBOARD: ['dashboard'] as const,
  MY_APPLICATION: ['my-application'] as const,
  ALL_APPLICATIONS: ['all-applications'] as const,
  ALL_DISCOUNT_CODES: ['all-discount-codes'] as const,
  DISCOUNT_CODES: ['discount-codes'] as const,
  USER_PROFILE: ['user-profile'] as const,
} as const;
