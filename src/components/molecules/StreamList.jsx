import React, { useEffect } from 'react'
import styles from './Stream.module.css'
import StreamContext from '../../contexts/StreamContext'
import shortid from 'shortid'

function Stream() {
  const { twits, setTwits } = React.useContext(StreamContext)

  return (
    <div className={styles.twits}>
      {twits.length > 0 &&
        twits.map(
          ({
            id,
            body,
            symbol,
            link,
            created_at,
            created_time,
            username,
            avatar_url,
            image_src,
            link_title,
            twitter_user_url,
            created_at_original,
          }) => {
            const bgThumbStyle = { backgroundImage: `url(${avatar_url})` }
            return (
              <div key={shortid()} className={styles.twit}>
                <header className={styles.header}>
                  <div className={styles.bgThumb} style={bgThumbStyle} />
                  <a href={twitter_user_url} className={styles.link}>
                    @{username}
                  </a>
                  <time className={styles.time}>{created_time}</time>
                  <strong className={styles.ticker}>{symbol}</strong>
                </header>
                <p>{body}</p>
                {image_src !== undefined && (
                  <figure>
                    <img alt={link_title} src={image_src} />
                  </figure>
                )}
                {link !== undefined && (
                  <a className={styles.link} href={link}>
                    {link_title !== undefined ? link_title : link}
                  </a>
                )}
              </div>
            )
          }
        )}
    </div>
  )
}

export default Stream
