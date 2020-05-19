import React from 'react'
import './styles/global.css'
import SearchBar from './components/molecules/SearchBar'
import Main from './Main'
import Stream from './components/molecules/StreamList'
import styles from './App.module.css'

function App() {
  return (
    <Main>
      <header className={styles.header}>
        <SearchBar placeholder='eg: AMZN, BABA, BTC ...' />
      </header>
      <Stream />
    </Main>
  )
}

export default App
