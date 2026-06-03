import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50/40 via-white to-white px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gray-200/20 to-gray-400/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
        className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 ring-1 ring-inset ring-gray-300/50 shadow-sm"
      >
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-2 text-lg text-gray-500"
      >
        Page not found
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-1 text-sm text-gray-400"
      >
        The page you are looking for does not exist or has been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Link to="/">
          <Button className="mt-8">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Go home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
