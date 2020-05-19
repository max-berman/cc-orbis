### About

Solution to Orbis' Frontend Engineer Code Challenge:

Using React and any available libraries, create a simple application using the StockTwits API.

Hosted Solution - https://cc-4-orbis.herokuapp.com/

## Available Scripts

## 👷 To run app in the development mode

```
npm dev
```

## 🏗 To build and serve locally

```
npm build
npm start
```

### Comments on the implementation

- The app consumes Stocktwits API method - `streams/symbol` which according to the [documentation](https://api.stocktwits.com/developers/docs/api#streams-symbol-docs) does not require authentication therefore it has been omitted.
- Refresh rate for a new twit stream - 30 sec.
- Due to rate limit (by stocktwits) the app refreshes twit stream only for the recently added tag.
- Due to time constrains unit testing has been omitted.
- Components are broken up based on atomic design metholody.
- No External UI library has been leveraged instead CSS Modules mixed with global CSS variables did the job.
- Autocomlete drop down - ideally the autocomplete data should be fetched from an external API but for this task, json data collected online is used.

### Room for improvements

- Sorting by twit-streams, tags, date, links, videos, images etc
- Twits refresh could be optimized to be less resource intencive
- Error handling via UI, currently it's done via console logging
- Notification regarding the limited rate from stocktwits API
- Unit Testing
