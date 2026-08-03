import React, { useState, useEffect } from 'react';
import api from '../api';
import { translations } from '../translations';
import { GoogleLogin } from '@react-oauth/google';

const Auth = ({ onLogin }) => {
  const t = (key) => translations.en[key] || key;
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // OTP state
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailWarning, setEmailWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  useEffect(() => {
    let timeout;
    if (emailWarning) {
      timeout = setTimeout(() => {
        setEmailWarning('');
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [emailWarning]);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setConfirmPassword('');
    setOtpStep(false);
    setOtp('');
    setOtpSent(false);
    setOtpVerified(false);
    setEmailWarning('');
    setResendCooldown(0);
  };

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError(t('Passwords do not match'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/send-otp', { email: formData.email, name: formData.name });
      setOtpStep(true);
      setOtpSent(true);
      setResendCooldown(60);
    } catch (err) {
      const errorType = err.response?.data?.errorType;
      const message = err.response?.data?.message;
      
      if (errorType === 'invalid_email') {
        setEmailWarning('INVALID EMAIL! PLEASE TYPE THE CORRECT EMAIL ID AGAIN!');
      } else if (errorType === 'user_exists') {
        setError('This email is already registered. Please login instead.');
      } else if (errorType === 'smtp_auth' || errorType === 'smtp_network' || errorType === 'smtp_error') {
        setError(message || 'Email service is temporarily unavailable. Please try Google Sign-In.');
      } else {
        setError(message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/verify-otp', { email: formData.email, otp });
      setOtpVerified(true);
      
      const res = await api.post('/auth/register', { 
        email: formData.email, 
        password: formData.password, 
        name: formData.name, 
        otp 
      });
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post('/auth/google', { token: credentialResponse.credential });
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Google authentication failed');
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In was unsuccessful');
  };

  const renderFormContent = () => {
    if (isLogin) {
      return (
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>{t('Email Address')}</label>
            <input 
              type="email" 
              placeholder="email@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
          </div>
          <div className="input-group">
            <label>{t('Password')}</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? t('Loading...') : t('Login')}
          </button>
        </form>
      );
    }

    if (!otpStep) {
      return (
        <form onSubmit={handleSendOTP}>
          <div className="input-group">
            <label>{t('Full Name')}</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          </div>
          <div className="input-group">
            <label>{t('Email Address')}</label>
            <input 
              type="email" 
              placeholder="email@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
          </div>
          <div className="input-group">
            <label>{t('Password')}</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              required 
            />
          </div>
          <div className="input-group">
            <label>{t('Confirm Password')}</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? t('Sending...') : t('Send Verification Code')}
          </button>
        </form>
      );
    }

    return (
      <form onSubmit={handleVerifyAndRegister}>
        <p style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          We've sent a 6-digit verification code to <strong>{formData.email}</strong>
        </p>
        <div className="input-group">
          <label style={{ textAlign: 'center' }}>{t('Verification Code')}</label>
          <input 
            type="text" 
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            required
            style={{ 
              letterSpacing: '0.5em', 
              textAlign: 'center', 
              fontSize: '1.5rem', 
              fontFamily: 'monospace',
            }} 
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || otp.length < 6}>
          {loading ? t('Verifying...') : t('Verify & Sign Up')}
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.875rem' }}>
          <span 
            style={{ color: '#3498db', cursor: 'pointer' }} 
            onClick={() => setOtpStep(false)}
          >
            ← Back
          </span>
          <span 
            style={{ 
              color: resendCooldown > 0 ? 'var(--text-secondary)' : '#3498db', 
              cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer' 
            }} 
            onClick={() => resendCooldown === 0 && handleSendOTP()}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : t('Resend Code')}
          </span>
        </div>
      </form>
    );
  };

  return (
    <div className="auth-container">
      <div className="card">
        {emailWarning && (
          <div 
            style={{ 
              backgroundColor: '#e74c3c', 
              color: 'white', 
              fontWeight: 'bold', 
              padding: '1rem', 
              marginBottom: '1rem', 
              borderRadius: '4px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setEmailWarning('')}
          >
            {emailWarning}
          </div>
        )}
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
          {isLogin ? t('Welcome Back!') : t('Join Nutri AI')}
        </h2>
        {error && <p style={{ color: '#e74c3c', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        
        {renderFormContent()}

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
          <span style={{ margin: '0 1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{t('OR')}</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme={document.body.classList.contains('dark-mode') ? "filled_black" : "outline"}
            text="continue_with"
            shape="rectangular"
          />
        </div>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
          {isLogin ? t("Don't have an account? ") : t("Already have an account? ")}
          <span style={{ color: '#3498db', cursor: 'pointer' }} onClick={handleToggleMode}>
            {isLogin ? t('Register') : t('Login')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
