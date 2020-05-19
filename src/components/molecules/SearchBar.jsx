import React, { useState, useEffect } from 'react'
import styles from './SearchBar.module.css'
import Loader from '../atoms/Loader'
import Button from '../atoms/Button'
import TextField from '../atoms/TextField'
import StreamContext from '../../contexts/StreamContext'
import Tags from '../molecules/Tags'
// Ideally the Autocomplete complete data should be fetched from an API
// for this task I had to use converted from csv to json data collected online
import { TICKERS } from '../../data/tickers'
import DropDownList from './DropDownList'

export default function SearchBar({ placeholder, initialValue }) {
  const { twits, setTwits, tags, setTags, fetchData } = React.useContext(
    StreamContext
  )
  const [value, setValue] = useState(initialValue || '')
  const [showDropDown, setShowDropDown] = useState(false)
  const [activeOption, setActiveOption] = useState(0)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [searchStarted, setSearchStarted] = useState(false)

  useEffect(() => {
    if (twits.length > 0) {
      setSearchStarted(false)
      setValue('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twits])

  function handleChange({ target: { value } }) {
    setValue(value)
    const matched = TICKERS.filter(
      ({ symbol }) => symbol.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    setShowDropDown(true)
    setFilteredOptions(matched)
  }

  function onKeyDown(e) {
    const { keyCode } = e
    if (keyCode === 13) {
      if (filteredOptions[activeOption] !== undefined) {
        const matchedOption = filteredOptions[activeOption].symbol
        console.log(matchedOption)
        setActiveOption(0)
        setValue(matchedOption)
        search(matchedOption)
        setShowDropDown(false)
      } else {
        setValue('')
      }
    } else if (keyCode === 38) {
      if (activeOption === 0) return

      setActiveOption(activeOption - 1)
    } else if (keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) return
      setActiveOption(activeOption + 1)
    } else {
    }
  }

  function search(val) {
    setSearchStarted(true)
    fetchData(val)
    setTags((prevState) => [...prevState, val])
    setShowDropDown(false)
  }

  function startSearch(e) {
    e.preventDefault()
    if (value === '') return
    const doesTagExist =
      tags.find((tag) => tag.toLowerCase() === value.toLowerCase()) !==
      undefined
    if (doesTagExist) return
    search(value)
  }

  return (
    <form className={styles.form}>
      <div className={styles.inputGroup}>
        <TextField
          type='search'
          placeholder={placeholder || ''}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className={styles.input}
        />
        <Button onClick={(e) => startSearch(e)}>
          {searchStarted ? <Loader isHorizontal /> : 'Pull'}
        </Button>
      </div>
      <DropDownList
        value={value}
        showDropDown={showDropDown}
        filteredOptions={filteredOptions}
        search={search}
        activeOption={activeOption}
      />
      {tags.length > 0 && (
        <Tags tags={tags} setTags={setTags} twits={twits} setTwits={setTwits} />
      )}
    </form>
  )
}
