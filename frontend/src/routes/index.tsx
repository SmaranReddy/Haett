import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout';
import { ProtectedRoute, AdminRoute } from '@/components/common';

import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import PartnerPage from '@/pages/partner/PartnerPage';
import PartnerDashboardPage from '@/pages/partner/DashboardPage';
import ApplicationPage from '@/pages/partner/ApplicationPage';
import CodesPage from '@/pages/partner/CodesPage';
import AdminApplicationsPage from '@/pages/admin/ApplicationsPage';
import AdminDiscountCodesPage from '@/pages/admin/DiscountCodesPage';
import NotFoundPage from '@/pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/partner" element={<PartnerPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<PartnerDashboardPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/codes" element={<CodesPage />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/admin/applications" element={<AdminApplicationsPage />} />
          <Route path="/admin/discount-codes" element={<AdminDiscountCodesPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/partner" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
