// /components/auth/InputField.tsx
'use client';
import { useState, InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Define the props for our component
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: IconType;
}

const InputField = ({ id, label, icon: Icon, type, ...props }: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="text-gray-400" />
        </div>
        <input
          id={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;