import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  error?: string
  label: string
}

function DatePicker({ className = '', disabled, error, id, label, ...props }: DatePickerProps) {
  const generatedId = useId()
  const datePickerId = id ?? generatedId
  const hasError = Boolean(error)

  return (
    <div className="grid gap-1.5">
      <label className={`text-sm font-medium ${disabled ? 'text-text-muted' : 'text-text'}`} htmlFor={datePickerId}>
        {label}
      </label>
      <input
        aria-describedby={error ? `${datePickerId}-description` : undefined}
        aria-invalid={hasError}
        className={`h-10 w-full rounded-md border bg-background px-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-light disabled:cursor-not-allowed disabled:border-border disabled:bg-surface disabled:text-text-muted ${hasError ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border'} ${className}`}
        disabled={disabled}
        id={datePickerId}
        type="date"
        {...props}
      />
      {error ? (
        <p className="text-sm text-danger" id={`${datePickerId}-description`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default DatePicker
