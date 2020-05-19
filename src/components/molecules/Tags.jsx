import React, { useEffect } from 'react'
import styles from './Tags.module.css'

function Tags({ tags, setTags, setTwits, twits }) {
  useEffect(() => {
    // console.log(twits.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twits])

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

  const numberOfTwits = (tag) =>
    twits.filter(({ symbol }) => symbol.toLowerCase() === tag.toLowerCase())
      .length

  return (
    <ul className={styles.tags}>
      {tags.map((tag, i) => (
        <li className={styles.tag} key={`${tag}-${i}`}>
          <span>{tag}</span>
          <i>{numberOfTwits(tag)}</i>
          <button onClick={(e) => handleClose(tag, e)}>&times;</button>
        </li>
      ))}
    </ul>
  )
}

export default Tags
