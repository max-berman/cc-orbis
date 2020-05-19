import React from 'react'
import styles from './Button.module.css'

const Button = ({
  primary,
  link,
  href,
  size,
  children,
  className,
  ...props
}) => {
  const classes = primary
    ? `${styles.button} ${styles.primary}`
    : link
    ? `${styles.button} ${styles.link}`
    : styles.button

  return href ? (
    <a href={href} className={`${classes} ${className}`} {...props}>
      {children}
    </a>
  ) : (
    <button className={`${classes} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
