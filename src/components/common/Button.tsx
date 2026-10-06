import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

/** Big rounded call-to-action. The look comes from the .primary / .secondary classes in index.css. */
export default function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return <button className={[variant, className].filter(Boolean).join(' ')} {...rest}>{children}</button>;
}
