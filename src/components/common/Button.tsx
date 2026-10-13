import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'income' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-background hover:bg-primary-hover disabled:bg-primary-light disabled:text-primary',
  secondary: 'bg-secondary-light text-danger hover:brightness-95 disabled:bg-secondary-light disabled:text-secondary',
  income: 'bg-income-light text-income-text hover:brightness-95 disabled:bg-income-light disabled:text-income-text',
  ghost: 'border border-border bg-background text-text hover:bg-surface disabled:bg-surface disabled:text-text-muted',
}

function Button({ children, className = '', disabled, type = 'button', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed ${variantClassNames[variant]} ${className}`}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
