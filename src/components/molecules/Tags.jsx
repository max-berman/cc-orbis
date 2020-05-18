import React, { useEffect } from 'react'
import styles from './Tags.module.css'

function Tags({ tags, setTags, setTwits, twits }) {
  function handleClose(tag, e) {
    e.preventDefault()
    const filteredTags = tags.filter(
      (currentTag) => currentTag.toLowerCase() !== tag.toLowerCase()
    )
    const filteredTwits = twits.filter(
      ({ symbol }) => symbol.toLowerCase() !== tag.toLowerCase()
    )
    setTags(filteredTags)
    setTwits(filteredTwits)
  }

  return (
    tags.length > 0 && (
      <ul className={styles.tags}>
        {tags.map((tag, i) => (
          <li className={styles.tag} key={`${tag}-${i}`}>
            <span>{tag} </span>
            <button onClick={(e) => handleClose(tag, e)}>&times;</button>
          </li>
        ))}
      </ul>
    )
  )
}

export default Tags
