import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-secondary px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 ring-1 ring-inset ring-gray-200">
        <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">404</h1>
      <p className="mt-2 text-lg text-gray-500">Page not found</p>
      <p className="mt-1 text-sm text-gray-400">The page you are looking for does not exist or has been moved.</p>
      <Link to="/">
        <Button className="mt-8">Go home</Button>
      </Link>
    </div>
  );
}
