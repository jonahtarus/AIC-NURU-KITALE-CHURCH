import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { auth, googleProvider, isApprovedAdmin, APPROVED_ADMIN_EMAILS } from '../../lib/firebase';

interface AdminLoginProps {
  onSuccess: () => void;
  onExitAdmin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onExitAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both your admin email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const userEmail = userCredential.user.email;

      if (!isApprovedAdmin(userEmail)) {
        await signOut(auth);
        setErrorMsg(
          `Access Denied: The account "${userEmail}" is not on the approved administrator allowlist. Only registered church administrators may log in.`
        );
        setIsLoading(false);
        return;
      }

      onSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setErrorMsg('Invalid email or password. Please check your credentials.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMsg(
          'Email/Password sign-in is pending activation in the Firebase Console. You can sign in immediately using Google with your approved admin email (jonahtarus20@gmail.com) below.'
        );
      } else if (err.code === 'auth/too-many-requests') {
        setErrorMsg('Too many unsuccessful attempts. Please wait a moment or reset your password.');
      } else {
        setErrorMsg(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      if (!isApprovedAdmin(userEmail)) {
        await signOut(auth);
        setErrorMsg(
          `Access Denied: "${userEmail}" is not an authorized church administrator. Please sign in with an approved account (${APPROVED_ADMIN_EMAILS.join(', ')}).`
        );
        setIsLoading(false);
        return;
      }

      onSuccess();
    } catch (err: any) {
      console.error('Google Sign-In error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(err.message || 'Google authentication failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your administrator email address to receive a password reset link.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfoMsg(`Password reset instructions have been sent to ${email.trim()}.`);
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send reset email. Ensure the email is registered.');
    }
  };

  return (
    <div className="min-h-screen bg-[#00162c] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,147,49,0.15),transparent_65%)] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Card */}
        <div className="bg-[#ffffff] rounded-2xl shadow-2xl p-8 border border-white/10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00162c] text-[#ffdea9] mb-2 shadow">
              <span className="material-symbols-outlined text-3xl">church</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#00162c]">
              AIC Nuru Kitale
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#7d5800] font-bold">
              Administrator Portal
            </p>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Authorized access only. Public user registration is disabled.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed flex items-start gap-2.5">
              <span className="material-symbols-outlined text-base flex-shrink-0 text-red-600">
                error
              </span>
              <span className="flex-1">{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs leading-relaxed flex items-start gap-2.5">
              <span className="material-symbols-outlined text-base flex-shrink-0 text-green-600">
                check_circle
              </span>
              <span className="flex-1">{infoMsg}</span>
            </div>
          )}

          <form onSubmit={handleEmailPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#00162c] uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aicnurukitale.org"
                  required
                  className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-gray-50/50 text-gray-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#00162c] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-[#7d5800] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  lock
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c59331] bg-gray-50/50 text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#00162c] text-[#ffffff] hover:bg-[#122b44] font-bold text-xs uppercase tracking-wider shadow transition disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">
                    progress_activity
                  </span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">login</span>
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-[11px] text-gray-400 uppercase font-semibold">
              Or Instant Sign-In
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Google Sign-in (Directly works for allowlisted jonahtarus20@gmail.com) */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 hover:border-[#c59331] hover:bg-gray-50 text-gray-800 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2.5 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Approved Google Account</span>
          </button>

          {/* Security details footnote */}
          <div className="pt-2 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-400">
              Configured admin allowlist: <strong className="text-gray-600">jonahtarus20@gmail.com</strong>
            </p>
          </div>
        </div>

        {/* Back to Public Site link */}
        <div className="text-center mt-6">
          <button
            onClick={onExitAdmin}
            className="text-xs text-[#b1c8e8] hover:text-[#ffdea9] transition flex items-center justify-center gap-1.5 mx-auto"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Return to Public Church Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
