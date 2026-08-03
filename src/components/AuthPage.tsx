import React, { useState, useEffect } from 'react';

export type AuthMode =
  | 'login'
  | 'register'
  | 'registration-success'
  | 'forgot-password'
  | 'check-email'
  | 'reset-password'
  | 'reset-success';

interface AuthPageProps {
  initialMode?: AuthMode;
  onClose?: () => void;
  onLoginSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form inputs
  const [email, setEmail] = useState('example@company.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Registration state
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 234-5678');
  const [role, setRole] = useState<'Administrator' | 'Store Manager' | 'Operator' | 'Viewer'>('Store Manager');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Reset password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Status & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  // Sync route hashes (#login, #forgot-password, etc.)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (
        [
          'login',
          'register',
          'registration-success',
          'forgot-password',
          'check-email',
          'reset-password',
          'reset-success',
        ].includes(hash)
      ) {
        setMode(hash as AuthMode);
      } else if (initialMode) {
        setMode(initialMode);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [initialMode]);

  const navigateTo = (newMode: AuthMode) => {
    setMode(newMode);
    window.location.hash = newMode;
    setErrorMsg(null);
    setResendStatus(null);
    setIsSuccessState(false);
  };

  // Helper for password strength meter
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 0) score++;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;
    return score;
  };

  // Submit Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both work email address and password.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your entries.');
      return;
    }
    if (!termsAccepted) {
      setErrorMsg('You must agree to the Terms & Conditions to register.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      navigateTo('registration-success');
    }, 1000);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessState(true);
      setTimeout(() => {
        navigateTo('check-email');
      }, 900);
    }, 1200);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      navigateTo('reset-success');
    }, 1000);
  };

  const handleResendEmail = () => {
    setResendStatus('A new password reset link has been sent to your email.');
    setTimeout(() => setResendStatus(null), 4000);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-sans antialiased w-full relative">
      {/* Optional Top Exit Button Removed */}

      <main className="flex min-h-screen w-full">
        {/* ================= LEFT PANEL: AUTHENTICATION FORM (40% Desktop) ================= */}
        <section className="w-full lg:w-[40%] flex flex-col justify-between items-center px-8 md:px-14 py-10 bg-white relative overflow-hidden min-h-screen z-10 shadow-xl">
          {/* Decorative Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="url(#grid)" height="100%" width="100%" />
            </svg>
          </div>

          <div className="max-w-md w-full relative z-10 my-auto flex flex-col justify-center">
            {/* Branding Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#28268d] text-3xl md:text-4xl font-extrabold tracking-tighter font-sans">
                  RETAILCOUNT
                </span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e1dfff] text-[#09006b] text-[11px] font-bold uppercase tracking-wider border border-[#4040a5]/10">
                Enterprise AI Retail Intelligence
              </span>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-6 p-3.5 bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ---------------- PAGE 1: LOGIN ---------------- */}
            {mode === 'login' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] mb-2 tracking-tight">
                    Welcome Back
                  </h1>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Sign in to securely access your RETAILCOUNT store intelligence dashboard and live camera feeds.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleLoginSubmit}>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#464552] block" htmlFor="login-email">
                      Work Email Address
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#777684] group-focus-within:text-[#4040a5] transition-colors text-[20px]">
                        mail
                      </span>
                      <input
                        id="login-email"
                        className="w-full pl-12 pr-4 py-3 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none transition-all text-sm font-medium"
                        placeholder="example@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#464552] block" htmlFor="login-password">
                      Password
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#777684] group-focus-within:text-[#4040a5] transition-colors text-[20px]">
                        lock
                      </span>
                      <input
                        id="login-password"
                        className="w-full pl-12 pr-11 py-3 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none transition-all text-sm font-medium"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777684] hover:text-[#4040a5] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#4040a5] focus:ring-[#4040a5]"
                      />
                      <span className="text-[#464552] font-medium">Remember Me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => navigateTo('forgot-password')}
                      className="text-[#4040a5] font-semibold hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#4040a5] hover:bg-[#28268d] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#4040a5]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-[#6B7280] pt-2">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigateTo('register')}
                    className="text-[#4040a5] font-bold hover:underline cursor-pointer"
                  >
                    Register
                  </button>
                </p>
              </div>
            )}

            {/* ---------------- PAGE 2: REGISTER ---------------- */}
            {mode === 'register' && (
              <div className="space-y-5">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] mb-1.5 tracking-tight">
                    Create Account
                  </h1>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Set up your RETAILCOUNT user account to monitor stores with academic AI precision.
                  </p>
                </div>

                <form className="space-y-3.5" onSubmit={handleRegisterSubmit}>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#464552] block">Full Name</label>
                    <input
                      className="w-full px-4 py-2.5 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none text-xs font-medium"
                      placeholder="e.g. Dr. Alex Morgan"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#464552] block">Work Email Address</label>
                      <input
                        className="w-full px-4 py-2.5 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none text-xs font-medium"
                        placeholder="alex@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#464552] block">Phone Number (Optional)</label>
                      <input
                        className="w-full px-4 py-2.5 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none text-xs font-medium"
                        placeholder="+1 (555) 234-5678"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#464552] block">Role</label>
                    <select
                      className="w-full px-4 py-2.5 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none text-xs font-medium text-[#191c1e] cursor-pointer"
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                    >
                      <option value="Administrator">Administrator</option>
                      <option value="Store Manager">Store Manager</option>
                      <option value="Operator">Operator</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#464552] block">Password</label>
                      <input
                        className="w-full px-4 py-2.5 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none text-xs font-medium"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#464552] block">Confirm Password</label>
                      <input
                        className="w-full px-4 py-2.5 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none text-xs font-medium"
                        placeholder="••••••••"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 rounded border-[#E5E7EB] text-[#4040a5] focus:ring-[#4040a5]"
                    />
                    <span className="text-[11px] text-[#464552] font-medium">
                      I agree to the <span className="text-[#4040a5] font-bold">Terms &amp; Conditions</span> and Privacy Policy.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#4040a5] hover:bg-[#28268d] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#4040a5]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 mt-1"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-[#6B7280]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigateTo('login')}
                    className="text-[#4040a5] font-bold hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </div>
            )}

            {/* ---------------- PAGE 3: REGISTRATION SUCCESS ---------------- */}
            {mode === 'registration-success' && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-[#16A34A]/10 text-[#16A34A] rounded-full flex items-center justify-center mx-auto border border-[#16A34A]/20 shadow-md">
                  <span className="material-symbols-outlined text-[38px]">check_circle</span>
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold text-[#191c1e] mb-2 tracking-tight">
                    Account Created Successfully!
                  </h1>
                  <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                    Your RETAILCOUNT credentials and role assigned (<strong>{role}</strong>) have been provisioned on the system.
                  </p>
                </div>

                <div className="p-4 bg-[#f2f4f6] border border-[#E5E7EB] rounded-2xl text-left text-xs space-y-2">
                  <div className="flex justify-between text-[#575e70]">
                    <span>Account Name:</span>
                    <strong className="text-[#191c1e]">{fullName}</strong>
                  </div>
                  <div className="flex justify-between text-[#575e70]">
                    <span>Assigned Role:</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#4040a5]/10 text-[#4040a5] font-bold uppercase text-[10px]">
                      {role}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigateTo('login')}
                  className="w-full bg-[#4040a5] hover:bg-[#28268d] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#4040a5]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  Go to Login
                </button>
              </div>
            )}

            {/* ---------------- PAGE 4: FORGOT PASSWORD (Exact Pixel Parity with Design) ---------------- */}
            {mode === 'forgot-password' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] mb-3">Forgot your password?</h1>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Enter the email associated with your account and we'll send you a secure password reset link.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleForgotPasswordSubmit}>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#464552] block" htmlFor="forgot-email">
                      Work Email Address
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#777684] group-focus-within:text-[#4040a5] transition-colors">
                        mail
                      </span>
                      <input
                        id="forgot-email"
                        className="w-full pl-12 pr-4 py-3 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4040a5]/20 focus:border-[#4040a5] outline-none transition-all text-sm font-medium"
                        placeholder="example@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white py-4 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 ${
                      isSuccessState
                        ? 'bg-[#16A34A] shadow-[#16A34A]/20'
                        : 'bg-[#4040a5] hover:bg-[#28268d] shadow-[#4040a5]/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                        Processing...
                      </>
                    ) : isSuccessState ? (
                      <>
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        Link Sent Successfully
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => navigateTo('login')}
                    className="inline-flex items-center gap-2 text-[#28268d] text-sm font-semibold hover:underline decoration-2 underline-offset-4 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to Sign In
                  </button>
                </div>

                {/* Security Note Box */}
                <div className="mt-12 p-4 bg-white rounded-xl border border-[#E5E7EB] flex items-start gap-3 shadow-sm">
                  <span
                    className="material-symbols-outlined text-[#F59E0B] text-[20px] mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lock
                  </span>
                  <p className="text-xs text-[#5c6274] leading-relaxed">
                    Password reset links expire after 30 minutes for your security. If you don't see the email, check your spam folder.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------- PAGE 5: CHECK YOUR EMAIL ---------------- */}
            {mode === 'check-email' && (
              <div className="space-y-6 pt-2">
                <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-[#16A34A]/10 border-4 border-[#16A34A]/20 mx-auto">
                  <span
                    className="material-symbols-outlined text-[#16A34A] text-[40px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>

                <div className="text-center">
                  <h1 className="text-3xl font-extrabold text-[#191c1e] mb-3">Check your email</h1>
                  <p className="text-base text-[#464552] leading-relaxed max-w-md mx-auto">
                    We've sent a secure password reset link to{' '}
                    <span className="font-semibold text-[#191c1e]">{email || 'john@example.com'}</span>. Please click the link in the email to continue.
                  </p>
                </div>

                {resendStatus && (
                  <div className="p-3 bg-[#16A34A]/10 text-[#16A34A] rounded-xl text-xs font-bold border border-[#16A34A]/20 text-center animate-fadeIn">
                    {resendStatus}
                  </div>
                )}

                {/* Info Card */}
                <div className="bg-white/80 backdrop-blur-md border border-[#E5E7EB] rounded-2xl p-6 space-y-3 shadow-sm">
                  <h3 className="text-sm font-semibold text-[#191c1e] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#28268d] text-[20px]">help</span>
                    Didn't receive the email?
                  </h3>
                  <ul className="space-y-3 text-sm text-[#464552]">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28268d] mt-2 shrink-0"></span>
                      <span>Check your spam or promotions folder.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28268d] mt-2 shrink-0"></span>
                      <span>Wait a few minutes for the server to process.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28268d] mt-2 shrink-0"></span>
                      <span>Ensure the email address provided is correct.</span>
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigateTo('reset-password')}
                    className="w-full bg-[#4040a5] hover:bg-[#28268d] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                    Proceed to Reset Password
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      className="w-full bg-white hover:bg-[#f2f4f6] text-[#191c1e] font-semibold py-3.5 rounded-xl border border-[#E5E7EB] transition-all active:scale-[0.98] text-sm cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">autorenew</span>
                      Resend Email
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateTo('login')}
                      className="w-full bg-white hover:bg-[#f2f4f6] text-[#28268d] font-semibold py-3.5 rounded-xl border border-[#E5E7EB] transition-all active:scale-[0.98] text-sm cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- PAGE 6: RESET PASSWORD ---------------- */}
            {mode === 'reset-password' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#191c1e] mb-2 tracking-tight">
                    Create a new password
                  </h1>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Choose a strong password to protect your RETAILCOUNT account. Your new password should be unique and not previously used.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleResetPasswordSubmit}>
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#464552] block" htmlFor="password">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        className="w-full px-4 py-3 rounded-xl bg-[#f2f4f6] border border-[#E5E7EB] focus:border-[#28268d] focus:ring-1 focus:ring-[#28268d] transition-all pr-12 outline-none text-sm font-medium text-[#191c1e]"
                        placeholder="••••••••"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#464552] hover:text-[#28268d] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showNewPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {(() => {
                    const hasLength = newPassword.length >= 8;
                    const hasUpper = /[A-Z]/.test(newPassword);
                    const hasLower = /[a-z]/.test(newPassword);
                    const hasNumber = /[0-9]/.test(newPassword);
                    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

                    let score = 0;
                    if (hasLength) score++;
                    if (hasUpper) score++;
                    if (hasLower) score++;
                    if (hasNumber) score++;
                    if (hasSpecial) score++;

                    const labels = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
                    const labelText = newPassword ? labels[score] : 'Too Weak';

                    let textColor = 'text-[#F22D2E]';
                    if (score >= 2 && score <= 3) textColor = 'text-[#F59E0B]';
                    else if (score >= 4) textColor = 'text-[#16A34A]';

                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#464552] font-semibold">Password Strength</span>
                          <span className={`font-bold ${textColor}`}>{labelText}</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {[1, 2, 3, 4, 5].map((seg) => {
                            let segBg = 'bg-[#E5E7EB]';
                            if (newPassword && seg <= score) {
                              if (score <= 1) segBg = 'bg-[#F22D2E]';
                              else if (score <= 3) segBg = 'bg-[#F59E0B]';
                              else segBg = 'bg-[#16A34A]';
                            }
                            return (
                              <div
                                key={seg}
                                className={`h-1.5 rounded-full transition-colors duration-300 ${segBg}`}
                              />
                            );
                          })}
                        </div>

                        {/* Checklist */}
                        <div className="space-y-1.5 pt-2">
                          <ul className="space-y-1.5 text-xs">
                            <li className={`flex items-center gap-2 ${hasLength ? 'text-[#16A34A] font-medium' : 'text-[#6B7280]'}`}>
                              <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: hasLength ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                check_circle
                              </span>
                              At least 8 characters
                            </li>
                            <li className={`flex items-center gap-2 ${hasUpper ? 'text-[#16A34A] font-medium' : 'text-[#6B7280]'}`}>
                              <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: hasUpper ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                check_circle
                              </span>
                              One uppercase letter
                            </li>
                            <li className={`flex items-center gap-2 ${hasLower ? 'text-[#16A34A] font-medium' : 'text-[#6B7280]'}`}>
                              <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: hasLower ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                check_circle
                              </span>
                              One lowercase letter
                            </li>
                            <li className={`flex items-center gap-2 ${hasNumber ? 'text-[#16A34A] font-medium' : 'text-[#6B7280]'}`}>
                              <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: hasNumber ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                check_circle
                              </span>
                              One number
                            </li>
                            <li className={`flex items-center gap-2 ${hasSpecial ? 'text-[#16A34A] font-medium' : 'text-[#6B7280]'}`}>
                              <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: hasSpecial ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                check_circle
                              </span>
                              One special character
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#464552] block" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-password"
                        className="w-full px-4 py-3 rounded-xl bg-[#f2f4f6] border border-[#E5E7EB] focus:border-[#28268d] focus:ring-1 focus:ring-[#28268d] transition-all pr-12 outline-none text-sm font-medium text-[#191c1e]"
                        placeholder="••••••••"
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#464552] hover:text-[#28268d] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showConfirmNewPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#4040a5] hover:bg-[#28268d] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#4040a5]/20 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                          Resetting Password...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => navigateTo('login')}
                        className="text-[#28268d] font-semibold text-sm hover:underline transition-all cursor-pointer"
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </div>
                </form>

                {/* Security Note */}
                <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-[#eceef0] text-[#464552] text-xs font-medium">
                  <span className="material-symbols-outlined text-[18px] text-[#191c1e] shrink-0 mt-0.5">lock</span>
                  <p>Your password is encrypted before transmission and securely stored in accordance with enterprise security protocols.</p>
                </div>
              </div>
            )}

            {/* ---------------- PAGE 7: PASSWORD RESET SUCCESS ---------------- */}
            {mode === 'reset-success' && (
              <div className="space-y-8 animate-in fade-in duration-500 py-2">
                <div className="flex flex-col items-start">
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 flex items-center justify-center mb-6">
                    <span
                      className="material-symbols-outlined text-[#16A34A] text-[40px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-[#191c1e] mb-4 tracking-tight">
                    Password changed successfully
                  </h1>
                  <p className="text-base text-[#6B7280] leading-relaxed">
                    Your enterprise credentials have been updated. You can now sign in to your RETAILCOUNT account with your new password.
                  </p>
                </div>

                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => navigateTo('login')}
                    className="w-full bg-[#4040a5] hover:bg-[#28268d] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] text-sm cursor-pointer"
                  >
                    Sign in to RETAILCOUNT
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>

                  <div className="flex items-start gap-3 p-4 bg-[#f2f4f6] rounded-xl border border-[#E5E7EB]">
                    <span
                      className="material-symbols-outlined text-[#575e70] text-[20px] shrink-0 mt-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      lock
                    </span>
                    <p className="text-xs text-[#575e70] leading-normal">
                      Your session has been secured. All other active sessions have been logged out for your protection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Print */}
          <footer className="w-full max-w-md pt-8 flex justify-between items-center text-[#777684] text-[11px] border-t border-[#E5E7EB]">
            <span>© {new Date().getFullYear()} RETAILCOUNT</span>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:text-[#4040a5]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#4040a5]">
                Terms of Service
              </a>
            </div>
          </footer>
        </section>

        {/* ================= RIGHT PANEL: PRODUCT SHOWCASE (60% Desktop) ================= */}
        <section
          className={`hidden lg:flex lg:w-[60%] relative items-center justify-center overflow-hidden min-h-screen ${
            mode === 'check-email'
              ? 'bg-[#f7f9fb]'
              : mode === 'reset-password'
              ? 'bg-[#e0e3e5]'
              : mode === 'reset-success'
              ? 'bg-gradient-to-br from-[#4040A5] via-[#28268D] to-[#1a1a5c]'
              : 'bg-[#191c1e]'
          }`}
        >
          {mode === 'reset-success' ? (
            /* Enterprise Gradient Showcase for Reset Success */
            <div className="relative w-full max-w-4xl px-8 lg:px-12 py-12 flex flex-col justify-center items-center">
              {/* Floating Decoration Badge Top Right */}
              <div className="absolute -top-12 right-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
                <span className="text-white text-[11px] font-bold uppercase tracking-widest">
                  REAL-TIME INFERENCE
                </span>
              </div>

              {/* Bento Grid Layout */}
              <div className="relative w-full grid grid-cols-12 gap-6 z-20">
                {/* Top-Left Live Feed Card (8 cols) */}
                <div className="col-span-8 aspect-video rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/15 relative group shadow-2xl">
                  <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F22D2E] animate-pulse"></span>
                    <span className="text-white text-[11px] font-bold uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded backdrop-blur-md">
                      Live: North Wing Hub
                    </span>
                  </div>

                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb7umKsPNvFSkea-MQz0sTiziMlr7lA7iSKCmrxVJ-LWGsx_xFw1dY8SmkwI2arZphcDb64V0JuawlIrV-5Wj1A-yi_1owYa7c41dX9IaSI3cdAq9MRFpqmVKJvQKOz-dPcG8eI_cQq-_J0g8Ri0mMmqqcPcvJntenIHxAJeB0UNVvHe1ZiKGTRHFttIeVkdvsc0Ne1pJHCGOIPwQ-TUTtioaBpWTkC9fK0JfK4UDkvIa4L0I8BA"
                    alt="Store AI Heatmap Overlay"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Mock Bounding Boxes Overlay */}
                  <div className="absolute top-[20%] left-[30%] w-[12%] h-[24%] border-2 border-[#16A34A] bg-[#16A34A]/10 rounded-md pointer-events-none">
                    <span className="absolute -top-6 left-0 text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded shadow">
                      ID-882 (VIP)
                    </span>
                  </div>
                  <div className="absolute top-[45%] left-[55%] w-[10%] h-[20%] border-2 border-[#16A34A] bg-[#16A34A]/10 rounded-md pointer-events-none">
                    <span className="absolute -top-6 left-0 text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded shadow">
                      ID-901
                    </span>
                  </div>
                </div>

                {/* Top-Right Analytics Column (4 cols) */}
                <div className="col-span-4 flex flex-col gap-5 justify-between">
                  {/* KPI Card 1: Spatial Density */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 flex flex-col justify-between shadow-xl flex-1">
                    <div>
                      <p className="text-white/60 text-xs font-semibold mb-1">Spatial Density</p>
                      <h3 className="text-white text-3xl font-extrabold tracking-tight">84.2%</h3>
                    </div>
                    <div className="h-10 flex items-end gap-1.5 mt-3">
                      <div className="flex-1 bg-white/20 rounded-t h-[40%]"></div>
                      <div className="flex-1 bg-white/40 rounded-t h-[70%]"></div>
                      <div className="flex-1 bg-white/20 rounded-t h-[50%]"></div>
                      <div className="flex-1 bg-white/60 rounded-t h-[90%]"></div>
                      <div className="flex-1 bg-white/30 rounded-t h-[60%]"></div>
                    </div>
                  </div>

                  {/* KPI Card 2: Traffic Flow */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-center">
                    <p className="text-white/60 text-xs font-semibold mb-1">Traffic Flow</p>
                    <h3 className="text-white text-3xl font-extrabold tracking-tight">+12.4k</h3>
                    <p className="text-[#16A34A] text-xs font-bold flex items-center mt-2 gap-1">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      Peak efficiency
                    </p>
                  </div>
                </div>

                {/* Bottom Detail Card (12 cols) */}
                <div className="col-span-12 bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 flex items-center justify-between border-l-4 border-l-[#16A34A] shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <span className="material-symbols-outlined text-[24px]">psychology</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Explainable AI Insight</h4>
                      <p className="text-white/70 text-xs mt-0.5">
                        Conversion probability increased by 14% due to optimal staffing in Zone B.
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/15 cursor-pointer shrink-0">
                    View Report
                  </button>
                </div>
              </div>
            </div>
          ) : mode === 'reset-password' ? (
            /* Reset Password CCTV Analytics Showcase */
            <div className="absolute inset-0 z-0 flex items-center justify-center w-full h-full">
              {/* Background Store Interior CCTV Image */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMeHyDYFF0v3gNYq-kS4SWbdbr71y-MFZ8wkGODo-NoWW6grALi7-0D5wDLUJxlVnUD7jucwJ2-KKoQ1CPP5hF3hDZkPoYxySrcJ6I83TC1oMWU1ekBO8AZnz-_cyUuoDl_TXXcFniQ3Lm7VlWODwuU8Xe8AZhVm12b9_QYrZRpZNXtrE1o6KYbarEbJndmXI8otjS8ow8z_JLH036f2uSesLSOKQ37qLHurzFP9zATthmmT5GKA')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#28268d]/10 via-transparent to-black/20" />

              {/* Dashboard Overlays */}
              <div className="relative z-10 w-full max-w-5xl px-8 lg:px-12 flex flex-col justify-center">
                <div className="w-full grid grid-cols-12 gap-6 items-center">
                  {/* Main AI Detection Feed Card */}
                  <div className="col-span-12 lg:col-span-8 aspect-video rounded-2xl overflow-hidden relative shadow-2xl border border-white/30 group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5we6QZP20b1f_eHn5awaBn6G4cqI90aTURRByY9s6IAiPhkrfVML0IHWJXs0b89C5xjOPVaURrJF-8RiGaH1wOJnQ-x_5FkcCE4mE3mdDwjrt7RCGQ2ND1TwDUKrSDvquXTLAV86GagZi3Q4KKbCopZ6BLJf76pYWdXNnaUMZnGc6LgSr5Djw6b5ez5Aip4tjMvaydt-x3nyA7PUghH8ektXWs3NTrTk5DceDr3GtMjR4bXWmmQ')`,
                      }}
                    />
                    {/* Live Badge */}
                    <div className="absolute top-4 left-4 bg-white/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg flex items-center gap-2 border border-white/40 shadow-md">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F22D2E] animate-pulse"></span>
                      <span className="text-xs font-bold text-[#191c1e] tracking-wider uppercase">
                        LIVE FEED: SECTOR A-4
                      </span>
                    </div>
                  </div>

                  {/* KPI Cards Stacked */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                    {/* Active Shoppers */}
                    <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center justify-between border border-white/40">
                      <div>
                        <p className="text-xs text-[#464552] font-medium">Active Shoppers</p>
                        <h3 className="text-3xl font-extrabold text-[#191c1e] tracking-tight">124</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#28268d]/10 flex items-center justify-center text-[#28268d]">
                        <span className="material-symbols-outlined text-[24px]">groups</span>
                      </div>
                    </div>

                    {/* Traffic Flow */}
                    <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center justify-between border border-white/40">
                      <div>
                        <p className="text-xs text-[#464552] font-medium">Traffic Flow</p>
                        <div className="flex items-center gap-2">
                          <h3 className="text-3xl font-extrabold text-[#191c1e] tracking-tight">+12%</h3>
                          <span className="text-[#16A34A] text-sm font-bold">▲</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A]">
                        <span className="material-symbols-outlined text-[24px]">trending_up</span>
                      </div>
                    </div>

                    {/* Spatial Density */}
                    <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-xl flex flex-col justify-between border border-white/40">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-[#464552] font-medium">Spatial Density</p>
                        <span className="text-xs bg-[#F59E0B]/15 text-[#D97706] px-2.5 py-0.5 rounded-md font-bold">
                          High Load
                        </span>
                      </div>
                      <div className="flex items-end gap-1.5 h-12 pt-2">
                        <div className="w-full bg-[#F59E0B] h-[40%] rounded-t-sm"></div>
                        <div className="w-full bg-[#F59E0B] h-[60%] rounded-t-sm"></div>
                        <div className="w-full bg-[#F59E0B] h-[90%] rounded-t-sm"></div>
                        <div className="w-full bg-[#F59E0B] h-[75%] rounded-t-sm"></div>
                        <div className="w-full bg-[#F59E0B] h-[50%] rounded-t-sm"></div>
                        <div className="w-full bg-[#F59E0B] h-[30%] rounded-t-sm"></div>
                        <div className="w-full bg-[#F59E0B] h-[45%] rounded-t-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branding Corner */}
                <div className="absolute bottom-8 right-8 text-right">
                  <p className="text-[10px] text-[#191c1e]/50 font-bold tracking-widest uppercase mb-0.5">
                    PROPRIETARY AI MODELING
                  </p>
                  <h2 className="text-2xl text-[#191c1e]/90 font-extrabold tracking-tight">
                    RETAILCOUNT v4.2
                  </h2>
                </div>
              </div>
            </div>
          ) : mode === 'check-email' ? (
            /* Light Theme Showcase for Check Your Email */
            <div className="relative z-10 w-full max-w-4xl p-8 lg:p-12 space-y-10">
              {/* Dashboard Showcase Card */}
              <div className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E5E7EB]">
                {/* Header */}
                <div className="bg-[#f2f4f6]/80 px-6 py-3.5 border-b border-[#E5E7EB] flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DC2626]"></span>
                    </span>
                    <span className="text-xs font-bold text-[#191c1e]">Live: North Entrance Wing</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-2 w-10 bg-[#4040a5]/20 rounded-full"></div>
                    <div className="h-2 w-6 bg-[#4040a5]/40 rounded-full"></div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row h-[420px]">
                  {/* Left: AI Camera Stream */}
                  <div className="relative flex-1 bg-[#2d3133] overflow-hidden group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgmyIR8Vyscd2n20A17pAnOE1gfX3XGXNowhmVRw93CBgoD2N-10-VKVPZpaF9YzauJ8IRQhokaEZ7-TNSf6AwvxQFOiFG2hqKjC8lmXfvNvPIp1P7GUlSXrX3yLX_0FbPdutYf_giMawZDOZYDPMJCr39hltjmAMxYt1anVHQck18H2XBbXpIKuZlhmAzw0GesBz9hpXXFq4B8IQ24hxwSsnGMDWo_wuuBc4w4_E_kuU6raW5kg"
                      alt="Store AI Analytics Stream"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Green AI Bounding Boxes */}
                    <div className="absolute top-[22%] left-[26%] w-24 h-48 border-2 border-[#16A34A] bg-[#16A34A]/10 rounded-md pointer-events-none">
                      <span className="absolute -top-5 left-0 bg-[#16A34A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        Customer #402
                      </span>
                    </div>

                    <div className="absolute top-[32%] right-[28%] w-20 h-40 border-2 border-[#16A34A] bg-[#16A34A]/10 rounded-md pointer-events-none">
                      <span className="absolute -top-5 left-0 bg-[#16A34A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        Customer #403
                      </span>
                    </div>

                    {/* KPI Cards Overlay inside stream */}
                    <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
                      <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-md border border-white/50">
                        <p className="text-[10px] uppercase font-bold text-[#6B7280]">Customers</p>
                        <p className="text-xl font-extrabold text-[#28268d]">124</p>
                      </div>

                      <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-md border border-white/50">
                        <p className="text-[10px] uppercase font-bold text-[#6B7280]">Traffic Flow</p>
                        <p className="text-xl font-extrabold text-[#16A34A]">+12%</p>
                      </div>

                      <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-md border border-white/50">
                        <p className="text-[10px] uppercase font-bold text-[#6B7280]">Avg Dwell</p>
                        <p className="text-xl font-extrabold text-[#28268d]">8.4m</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Spatial Density */}
                  <div className="w-full lg:w-64 bg-white p-5 flex flex-col gap-3 border-l border-[#E5E7EB]">
                    <h4 className="text-xs font-bold text-[#191c1e]">Spatial Density</h4>
                    <div className="flex-1 relative rounded-xl bg-[#f2f4f6] overflow-hidden border border-[#E5E7EB]">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNMnPE8KXtZ4_6Ni8q8ZeTvRd1MQVpePuM33pNiLSeJvKBCmXzdXVw2hEcUjuSyAjgwaYBSvkIEqlVtAlyCymh0qTXqpRE0i5J9ajnB1aAsUbfGqEOYP12wMnTEzxVEG2eWPYaRt_pwa2U5K10wzJFulmimEqPl4llX0_yHVjfivfSNXJGhxWUCrP1d4dwtrVyV9PhRn72X-Vbgi0-HFcEwiaZh9bTC5G3mr2gP4dwBPW0dXpfjw"
                        alt="Store Spatial Density Heatmap"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-[#464552]">Checkout Zone</span>
                        <span className="text-[#DC2626]">High</span>
                      </div>
                      <div className="w-full h-2 bg-[#f2f4f6] rounded-full overflow-hidden border border-[#E5E7EB]">
                        <div className="w-[85%] h-full bg-[#DC2626] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badges Section */}
              <div className="grid grid-cols-3 gap-6 pt-2">
                <div className="flex items-center gap-3.5 group">
                  <div className="w-11 h-11 rounded-xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] group-hover:bg-[#28268d] group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[22px]">verified_user</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#191c1e]">SOC2 Compliant</h4>
                    <p className="text-[11px] text-[#6B7280]">Enterprise-grade data encryption</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 group">
                  <div className="w-11 h-11 rounded-xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] group-hover:bg-[#28268d] group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[22px]">visibility_off</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#191c1e]">GDPR Ready</h4>
                    <p className="text-[11px] text-[#6B7280]">Automatic facial anonymization</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 group">
                  <div className="w-11 h-11 rounded-xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] group-hover:bg-[#28268d] group-hover:text-white transition-all duration-300 shrink-0">
                    <span className="material-symbols-outlined text-[22px]">data_thresholding</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#191c1e]">Secure AI Edge</h4>
                    <p className="text-[11px] text-[#6B7280]">On-premise data processing</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Dark Theme Showcase Overlay for Other Modes */
            <>
              {/* Atmospheric Pulse Radial Glows */}
              <div className="absolute top-1/4 -right-24 w-80 h-80 bg-[#4040a5]/25 blur-[120px] rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-[#F22D2E]/15 blur-[120px] rounded-full animate-pulse"></div>

              {/* High-Performance AI UI Showcase Overlay */}
              <div className="relative z-10 w-full max-w-4xl px-12">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video group bg-neutral-900">
                  {/* Live Camera Feed Image */}
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA72n16qf4CNfDUAfxrNu99IonmreognxcH42rEIRdhesnb2gwsrkf_B0WQycQvRt3LbZBEf_49NFY21kGsVx4t0Sq5YKTvpIMR9vVD2t4pL8BcZrUX5J0X8NHz5zdgbpYMQ56idZ09P6fDEje0whbFFVhxWnJ_J_lR6s3wxxKlNAohQLNORvngwwnphTayqxf4_eVbTT8zP448XRPK7WW-0IeBYLezsF5mS6dznSRuTT1H4c63TQ')`,
                    }}
                  />

                  {/* AI Overlays UI */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DC2626]"></span>
                      </span>
                      <span className="text-xs text-white uppercase tracking-widest font-bold">
                        LIVE AI ANALYSIS: STORE #842
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* KPI Card 1 */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg">
                        <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider mb-1">
                          Customer Count
                        </div>
                        <div className="text-white font-extrabold text-2xl">142</div>
                        <div className="text-[#16A34A] text-xs font-bold flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
                        </div>
                      </div>

                      {/* KPI Card 2 */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg">
                        <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider mb-1">
                          Traffic Flow
                        </div>
                        <div className="text-white font-extrabold text-2xl">High</div>
                        <div className="text-[#e1dfff] text-xs font-bold flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">speed</span> Optimized
                        </div>
                      </div>

                      {/* KPI Card 3 */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg">
                        <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider mb-1">
                          Avg Dwell Time
                        </div>
                        <div className="text-white font-extrabold text-2xl">8.4m</div>
                        <div className="text-[#F59E0B] text-xs font-bold flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">query_builder</span> +2.1m
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Tech Corner Brackets */}
                  <div className="absolute top-6 right-6 pointer-events-none">
                    <div className="w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-lg"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 pointer-events-none">
                    <div className="w-12 h-12 border-b-2 border-l-2 border-white/30 rounded-bl-lg"></div>
                  </div>
                </div>

                {/* Supporting Headline for Showcase */}
                <div className="mt-10 text-center">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight">
                    Secure AI Data Protection
                  </h3>
                  <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed">
                    RETAILCOUNT ensures enterprise-grade security for your retail intelligence with multi-factor authentication and encrypted data streams.
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};
