import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

type SelectOption = {
  label: string
  value: string
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  error?: string
  label: string
  options: SelectOption[]
  placeholder?: string
}

function Select({ className = '', disabled, error, id, label, options, placeholder = '선택하세요.', ...props }: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hasError = Boolean(error)

  return (
    <div className="grid gap-1.5">
      <label className={`text-sm font-medium ${disabled ? 'text-text-muted' : 'text-text'}`} htmlFor={selectId}>
        {label}
      </label>
      <div className="relative">
        <select
          aria-describedby={error ? `${selectId}-description` : undefined}
          aria-invalid={hasError}
          className={`h-10 w-full appearance-none rounded-md border bg-background px-3 pr-10 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-light disabled:cursor-not-allowed disabled:border-border disabled:bg-surface disabled:text-text-muted ${hasError ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border'} ${className}`}
          disabled={disabled}
          id={selectId}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
      {error ? (
        <p className="text-sm text-danger" id={`${selectId}-description`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default Select
export type { SelectOption }
