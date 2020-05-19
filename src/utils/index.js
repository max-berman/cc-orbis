// Clear Twit's body message from all links
export const cleanBody = (val) => {
  const REGEX_URL = /((https?:\/\/)?[\w-]+(\.[a-z-]+)+\.?(:\d+)?(\/\S*)?)/g
  const url = val.match(REGEX_URL)
  if (url !== null) {
    return val.replace(REGEX_URL, '')
  } else {
    return val
  }
}

// transform published twit's time to readable string - by date, hour or min
export const parseTime = (t) => {
  const time = new Date(t)
  const now = new Date()
  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]
  const monthIndex = time.getMonth()
  const hrDif = now.getHours() - time.getHours()
  const minDif = now.getMinutes() - time.getMinutes()

  if (now.getDate() > time.getDate()) {
    return `${time.getDate()} ${months[monthIndex]}`
  } else return hrDif === 0 ? `${minDif}min` : `${hrDif}h`
}

// transform array of twits and remove needless fields
export const transformStream = (data, symbol) => {
  const newStream = data.map(
    ({ id, body, links, created_at, user: { username, avatar_url } }) => ({
      id,
      body: cleanBody(body),
      symbol,
      link: links !== undefined ? links[0].url : undefined,
      image_src: links !== undefined ? links[0].image : undefined,
      created_time: parseTime(created_at),
      created_at: created_at,
      link_title:
        links !== undefined && links[0].title !== undefined
          ? links[0].title
          : undefined,
      username,
      avatar_url,
      twitter_user_url: `https://twitter.com/${username}`,
    })
  )
  return newStream
}

export function catchErrors(err) {
  if (err.text) {
    err.text().then((err) => {
      console.log(err)
    })
  } else {
    console.log(err)
  }
}

// Handle response errors
export const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response.json()
}
