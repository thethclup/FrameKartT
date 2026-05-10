import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "font-display font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        {
          'bg-gradient-to-r from-[--color-base-blue] to-[--color-fc-purple] text-white hover:brightness-110': variant === 'primary',
          'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-500': variant === 'danger',
          'bg-transparent text-slate-300 hover:bg-slate-800 shadow-none': variant === 'ghost',
          
          'px-3 py-1.5 text-xs': size === 'sm',
          'px-6 py-3 text-sm': size === 'md',
          'px-8 py-4 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
