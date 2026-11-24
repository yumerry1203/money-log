import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
  helperText?: string
  label: string
}

const Textarea = ({ className = '', disabled, error, helperText, id, label, ...props }: TextareaProps) => {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const hasError = Boolean(error)

  return (
    <div className="grid gap-[0.6rem]">
      <label className={`text-sm font-medium ${disabled ? 'text-text-muted' : 'text-text'}`} htmlFor={textareaId}>
        {label}
      </label>
      <textarea
        aria-describedby={error || helperText ? `${textareaId}-description` : undefined}
        aria-invalid={hasError}
        className={`min-h-[9.6rem] w-full resize-y rounded-md border bg-background px-[1.2rem] py-1 text-sm text-text outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary-light disabled:cursor-not-allowed disabled:border-border disabled:bg-surface disabled:text-text-muted ${hasError ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border'} ${className}`}
        disabled={disabled}
        id={textareaId}
        {...props}
      />
      {error ? (
        <p className="text-sm text-danger" id={`${textareaId}-description`}>
          {error}
        </p>
      ) : null}
      {!error && helperText ? (
        <p className="text-sm text-text-muted" id={`${textareaId}-description`}>
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

export default Textarea
