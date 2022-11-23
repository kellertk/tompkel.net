const fs = require('fs')
const path = require('path')
const { nanoid } = require('nanoid')

const hash = nanoid();

const DATAFILE =  path.join(__dirname, '../data/csshash.json');
const MINIFIED_CSSFILE = `index.${hash}.min.css`

var jsonValue = `{
  "indexCSS": "${MINIFIED_CSSFILE}"
}`
fs.writeFileSync(DATAFILE, jsonValue)
