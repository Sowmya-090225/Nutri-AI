import React, { useState } from 'react';
import api from '../api';
import { translations } from '../translations';
import { GoogleLogin } from '@react-oauth/google';

const Auth = ({ onLogin }) => {
  const t = (key) => translations.en[key] || key;
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== confirmPassword) {
      setError(t('Passwords do not match'));
      return;
    }
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await api.post(endpoint, formData);
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setConfirmPassword('');
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

  return (
    <div className="auth-container">
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
          {isLogin ? t('Welcome Back!') : t('Join Nutri AI')}
        </h2>
        {error && <p style={{ color: '#e74c3c', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>{t('Full Name')}</label>
              <input type="text" placeholder="John Doe" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
          )}
          <div className="input-group">
            <label>{t('Email Address')}</label>
            <input type="email" placeholder="email@example.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>{t('Password')}</label>
            <input type="password" placeholder="••••••••" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label>{t('Confirm Password')}</label>
              <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          )}
          <button type="submit" className="btn btn-primary">{isLogin ? t('Login') : t('Sign Up')}</button>
        </form>

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
