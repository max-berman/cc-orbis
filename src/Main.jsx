import React, { useState } from 'react'
import styles from './Main.module.css'
import Header from './components/organisms/Header'
import StreamContext from './contexts/StreamContext'
import useInterval from './hooks/useInterval'
import { uniqBy } from 'lodash'
import { handleErrors, catchErrors, transformStream } from './utils'

const INTERVAL = 30000

function Main({ children, title }) {
  const [twits, setTwits] = useState([])
  const [tags, setTags] = useState([])

  function fetchData(symbol) {
    fetch(`/api`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol }),
    })
      .then(handleErrors)
      .then(({ symbol: { symbol }, messages, response: { status } }) => {
        if (status === 200) {
          const newStream = transformStream(messages, symbol)
          //console.log(uniqueById(newStream))
          setTwits((prevState) => uniqBy([...prevState, ...newStream], 'id'))
        } else {
          throw Error(status)
        }
      })
      .catch(catchErrors)
  }

  useInterval(() => {
    if (tags.length > 0) {
      // tags.forEach((tag) => {
      //   fetchData(tags)
      // })
      fetchData(tags[tags.length - 1])
    }
  }, INTERVAL)

  return (
    <div className={styles.app}>
      <Header />
      <StreamContext.Provider
        value={{ twits, setTwits, tags, setTags, fetchData }}
      >
        <main className={styles.main}>{children}</main>
      </StreamContext.Provider>
    </div>
  )
}
export default Main
