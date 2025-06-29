// /components/auth/AuthForm.tsx
'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { FiUser, FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import InputField from './InputField';


// A simple component for the login/register toggle
const AuthToggle = ({ isLogin, setIsLogin }: { isLogin: boolean; setIsLogin: (value: boolean) => void }) => (
  <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
    <button
      onClick={() => setIsLogin(true)}
      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${isLogin ? 'bg-white shadow-sm text-teal-600' : 'text-gray-600'}`}
    >
      Login
    </button>
    <button
      onClick={() => setIsLogin(false)}
      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${!isLogin ? 'bg-white shadow-sm text-teal-600' : 'text-gray-600'}`}
    >
      Register
    </button>
  </div>
);

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login submitted:', { email: formData.email, password: formData.password });
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      console.log('Register submitted:', formData);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-600">{isLogin ? 'Sign in to your dashboard' : 'Join thousands of farmers optimizing with AI'}</p>
        </div>

        <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <InputField id="name" name="name" label="Full Name" type="text" icon={FiUser} placeholder="John Smith" value={formData.name} onChange={handleChange} required />
          )}

          <InputField id="email" name="email" label="Email Address" type="email" icon={FiMail} placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          <InputField id="password" name="password" label="Password" type="password" icon={FiLock} placeholder="••••••••" value={formData.password} onChange={handleChange} required />

          {!isLogin && (
            <InputField id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" icon={FiLock} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-500">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
            {isLogin ? 'Login to Dashboard' : 'Create Account'}
            <FiArrowRight className="ml-2" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-teal-600 hover:text-teal-500">
              {isLogin ? 'Register now' : 'Login here'}
            </button>
          </p>
        </div>
        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;