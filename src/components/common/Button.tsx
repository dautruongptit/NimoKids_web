import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'blue-btn' | 'lavender-btn';
};

export default function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return <button className={['squishy-btn', variant, className].filter(Boolean).join(' ')} {...rest}>{children}</button>;
}
