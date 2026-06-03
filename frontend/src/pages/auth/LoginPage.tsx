import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useLogin } from '@/hooks';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { APP_NAME } from '@/utils/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-brand-50/40 via-white to-white px-6 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand-200/30 to-brand-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-200/20 to-brand-300/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md relative"
      >
        <Card variant="glass-strong" className="w-full">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/20"
            >
              <LogIn className="h-6 w-6" />
            </motion.div>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your {APP_NAME} account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button type="submit" className="w-full" isLoading={login.isPending}>
                Sign in
              </Button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-500 underline-offset-2 hover:underline">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
