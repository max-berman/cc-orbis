import React, { ChangeEvent } from 'react'
import styles from './TextField.module.css'

const TextField = ({
  type,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder || 'What are you looking for?'}
      value={value}
      onChange={onChange}
      required
      {...props}
    />
  )
}

export default TextField
