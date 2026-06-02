# QA Checklist — Haett Partner Management Platform

## Manual Testing Checklist

### Authentication
- [ ] Register with valid data redirects to application form
- [ ] Register with existing email shows error toast
- [ ] Register with weak password shows validation errors
- [ ] Login with valid credentials redirects by role
- [ ] Login with wrong credentials shows error toast
- [ ] Logout clears session and redirects to login
- [ ] Session persists across page refresh (localStorage)
- [ ] Expired/invalid token shows 401 and auto-logout
- [ ] Unauthenticated user cannot access protected routes
- [ ] Non-admin user cannot access admin routes

### Partner Application Flow
- [ ] Visitor sees landing page with benefits and how-it-works
- [ ] "Apply Now" redirects to registration
- [ ] Authenticated user without application sees form
- [ ] Form validates all required fields (partner type, business name)
- [ ] Form shows character count for description
- [ ] Form rejects audience size > 100M
- [ ] Form rejects business name > 200 chars
- [ ] Submit creates application and shows pending view
- [ ] Pending view shows application details and status badge
- [ ] Refreshing on pending view keeps correct state
- [ ] Rejected application shows reason and reapply button
- [ ] Reapply button shows pre-filled form
- [ ] Resubmit updates application and shows pending view

### Admin Review Panel
- [ ] Admin sees all applications with tab filters
- [ ] Tab filters work (All, Pending, Approved, Rejected)
- [ ] Tab counts are accurate
- [ ] Empty state shows helpful message for each tab
- [ ] Application card shows business name, applicant, type, audience
- [ ] Social link is truncated if too long
- [ ] Description is limited to 3 lines
- [ ] Approve button creates discount code and shows approved state
- [ ] Reject button opens inline form
- [ ] Reject form requires min 10 characters
- [ ] Cancel closes reject form
- [ ] Confirm reject updates status and shows reason
- [ ] Approve/reject on non-pending app shows error
- [ ] Toggle activates/deactivates discount code

### Partner Dashboard
- [ ] Approved user sees dashboard with stats grid
- [ ] Stats show correct counts (codes, uses, discount amount)
- [ ] Discount code list shows all codes
- [ ] Copy button copies code to clipboard
- [ ] Copy button shows "Copied" state for 2 seconds
- [ ] Clipboard fallback works (execCommand)
- [ ] Inactive codes show "Inactive" badge
- [ ] Expiring codes show expiration date

### Error & Loading States
- [ ] Skeleton loaders show on initial data fetch
- [ ] API failure shows error fallback with retry button
- [ ] Network error shows meaningful message
- [ ] 404 from API returns proper error state
- [ ] Mutation errors show toast notification
- [ ] Loading spinner on submit buttons
- [ ] Double-submit prevented (button disabled while loading)
- [ ] Page not found (404) shows branded error page

### Responsive Design
- [ ] Mobile: sidebar is hidden, hamburger menu works
- [ ] Mobile: overlay closes sidebar on tap
- [ ] Mobile: forms are full-width
- [ ] Mobile: buttons are full-width on small screens (CTA section)
- [ ] Mobile: stat grid stacks vertically
- [ ] Mobile: admin tabs are compact
- [ ] Mobile: discount code cards stack vertically
- [ ] Tablet: all layouts work at 768px breakpoint
- [ ] Desktop: sidebar is always visible
- [ ] Desktop: max-width constraint on content areas

## Edge-Case Testing Checklist

### Form Edge Cases
- [ ] Very long business name (200 chars) — truncated display
- [ ] Empty phone number — optional, should submit
- [ ] Empty social link — optional, should submit
- [ ] Empty description — optional, should submit
- [ ] Audience size of 0 — should submit
- [ ] Audience size of 100,000,000 — maximum allowed
- [ ] Audience size of "abc" — validation error
- [ ] Special characters in business name
- [ ] Extremely long URL in social link
- [ ] Submitting with empty required fields

### Application State Edge Cases
- [ ] User refreshes during reapply — form shows correctly
- [ ] User navigates away and back during pending state
- [ ] Multiple rapid approve clicks — only one mutation fires
- [ ] Multiple rapid reject clicks — only one mutation fires
- [ ] Approving then immediately rejecting (should fail)
- [ ] Toggling discount code rapidly
- [ ] Two users with same email (should fail at register)

### Auth Edge Cases
- [ ] User navigates to /login while already logged in
- [ ] User navigates to /register while already logged in
- [ ] Token expires mid-session
- [ ] localStorage is cleared manually
- [ ] Browser back/forward after login/logout

### Admin Edge Cases
- [ ] Empty database shows proper empty states
- [ ] All applications approved — empty pending tab
- [ ] All applications rejected — empty approved tab
- [ ] No applications at all — "all" tab empty

## Demo Flow Order

1. Visit landing page (`/partner`) as visitor
2. Click "Apply Now" → Register
3. Fill out and submit partner application
4. See pending review state
5. Logout, login as admin (`admin@example.com`)
6. See application in pending tab
7. Approve the application
8. Logout, login as user (`user@example.com`)
9. See approved dashboard with stats and discount code
10. Copy discount code
11. (Optional) Log back in as admin, reject another application
12. Login as user, see rejection reason, click reapply
