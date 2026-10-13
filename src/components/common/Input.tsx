import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  helperText?: string
  label: string
}

function Input({ className = '', disabled, error, helperText, id, label, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hasError = Boolean(error)

  return (
    <div className="grid gap-1.5">
      <label className={`text-sm font-medium ${disabled ? 'text-text-muted' : 'text-text'}`} htmlFor={inputId}>
        {label}
      </label>
      <input
        aria-describedby={error || helperText ? `${inputId}-description` : undefined}
        aria-invalid={hasError}
        className={`h-10 w-full rounded-md border bg-background px-3 text-sm text-text outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary-light disabled:cursor-not-allowed disabled:border-border disabled:bg-surface disabled:text-text-muted ${hasError ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border'} ${className}`}
        disabled={disabled}
        id={inputId}
        {...props}
      />
      {error ? (
        <p className="text-sm text-danger" id={`${inputId}-description`}>
          {error}
        </p>
      ) : null}
      {!error && helperText ? (
        <p className="text-sm text-text-muted" id={`${inputId}-description`}>
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

export default Input
