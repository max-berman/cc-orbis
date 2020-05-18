import React from 'react'
import styles from './Header.module.css'
import Logo from '../../images/logo.svg'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <span>
          Code challenge implementation for Orbis by{' '}
          <a
            className={styles.link}
            href='https://www.linkedin.com/in/maxberman/'
          >
            Max Berman
          </a>
        </span>
      </div>
    </header>
  )
}
