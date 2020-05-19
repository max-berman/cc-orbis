import React from 'react'
import styles from './DropDownList.module.css'

export default function DropDownList({
  value,
  showDropDown,
  filteredOptions,
  search,
  activeOption,
}) {
  return (
    showDropDown &&
    value &&
    filteredOptions.length && (
      <ul className={styles.dropDownList}>
        {filteredOptions.map(({ symbol, name }, i) => (
          <li
            key={i}
            onClick={() => search(symbol)}
            className={i === activeOption ? styles.active : ''}
          >
            {symbol}
          </li>
        ))}
      </ul>
    )
  )
}
