import React, { ReactNode, useState, createContext } from 'react'
import styles from './Main.module.css'
import Header from './components/organisms/Header'
import StreamContext from './contexts/StreamContext'
import useInterval from './hooks/useInterval'
import { fetchData } from './utils'

const INTERVAL = 10000

function Main({ children, title }) {
  const [twits, setTwits] = useState([])
  const [tags, setTags] = useState([])

  useInterval(() => {
    // logic goes here
    if (tags.length > 0) {
      tags.forEach((tag) => {
        fetchData(tag, setTwits)
      })
    }
  }, INTERVAL)

  return (
    <div className={styles.app}>
      <Header />
      <StreamContext.Provider value={{ twits, setTwits, tags, setTags }}>
        <main className={styles.main}>{children}</main>
      </StreamContext.Provider>
    </div>
  )
}
export default Main
