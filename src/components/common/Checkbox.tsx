import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

function Checkbox({ checked, className = '', disabled, id, label, ...props }: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  return (
    <label className={`inline-flex items-center gap-2 text-sm font-medium ${disabled ? 'cursor-not-allowed text-text-muted' : 'cursor-pointer text-text'}`} htmlFor={checkboxId}>
      <input
        checked={checked}
        className={`size-5 rounded border-border accent-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:cursor-not-allowed disabled:accent-border ${className}`}
        disabled={disabled}
        id={checkboxId}
        type="checkbox"
        {...props}
      />
      {label}
    </label>
  )
}

export default Checkbox
