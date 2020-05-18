import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import styles from './SearchBar.module.css'
import Loader from '../atoms/Loader'
import Button from '../atoms/Button'
import TextField from '../atoms/TextField'
import StreamContext from '../../contexts/StreamContext'
import Tags from '../molecules/Tags'
import { fetchData } from '../../utils'
// Ideally the Autocomplete complete data should be fetched from an API
// for this task I had to use converted from csv to json data collected online
import { TICKERS } from '../../data/tickers'

export default function SearchBar({ placeholder, initialValue, filters }) {
  const { twits, setTwits, tags, setTags } = React.useContext(StreamContext)
  const [value, setValue] = useState(initialValue || '')
  const [searchStarted, setSearchStarted] = useState(false)

  useEffect(() => {
    if (twits.length > 0) {
      setSearchStarted(false)
      setValue('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twits])

  function handleChange(e) {
    setValue(e.target.value)
  }

  function startSearch(e) {
    e.preventDefault()
    if (value === '') return
    const doesTagExist =
      tags.find((tag) => tag.toLowerCase() === value.toLowerCase()) !==
      undefined
    if (doesTagExist) return
    setSearchStarted(true)
    fetchData(value, setTwits, setTags)
    setTags((prevState) => [...prevState, value])
  }

  useEffect(() => {
    return () => {
      setSearchStarted(false)
    }
  }, [])

  return (
    <form className={styles.form}>
      <div className={styles.inputGroup}>
        <TextField
          type='search'
          placeholder={placeholder || ''}
          value={value}
          onChange={(e) => handleChange(e)}
          className={styles.input}
        />
        <Button onClick={(e) => startSearch(e)}>
          {searchStarted ? <Loader isHorizontal /> : 'Search'}
        </Button>
      </div>
      <Tags tags={tags} setTags={setTags} twits={twits} setTwits={setTwits} />
    </form>
  )
}
