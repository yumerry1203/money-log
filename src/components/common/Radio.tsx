import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

function Radio({ checked, className = '', disabled, id, label, ...props }: RadioProps) {
  const generatedId = useId()
  const radioId = id ?? generatedId

  return (
    <label className={`inline-flex items-center gap-2 text-sm font-medium ${disabled ? 'cursor-not-allowed text-text-muted' : 'cursor-pointer text-text'}`} htmlFor={radioId}>
      <input
        checked={checked}
        className={`size-5 border-border accent-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:cursor-not-allowed disabled:accent-border ${className}`}
        disabled={disabled}
        id={radioId}
        type="radio"
        {...props}
      />
      {label}
    </label>
  )
}

export default Radio
