import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useAdminLogin } from '@/hooks';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const adminLogin = useAdminLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    adminLogin.mutate({ email, password });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-slate-700/40 to-slate-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-slate-700/30 to-slate-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-brand-500/5 to-transparent blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md relative"
      >
        <Card className="w-full border-slate-700/50 bg-slate-800/60 backdrop-blur-2xl shadow-2xl shadow-black/40">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 text-slate-200 shadow-lg shadow-black/30 ring-1 ring-slate-600/50"
            >
              <Shield className="h-6 w-6" />
            </motion.div>
            <CardTitle className="text-xl text-white">Admin Portal</CardTitle>
            <CardDescription className="text-slate-400">Authorized personnel only</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 caret-slate-900 focus-visible:border-brand-500 focus-visible:ring-brand-500/30"
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
                  className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 caret-slate-900 focus-visible:border-brand-500 focus-visible:ring-brand-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25"
                isLoading={adminLogin.isPending}
              >
                Sign in to Admin
              </Button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-500">
              <Link to="/login" className="font-semibold text-slate-400 hover:text-slate-300 underline-offset-2 hover:underline">
                Back to user login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
