import fs from "node:fs";
import path from "node:path";
import { nanoid } from "nanoid";

const hash = nanoid();

const DATAFILE =  path.join(import.meta.dirname, '../data/csshash.json');
const MINIFIED_CSSFILE = `index.${hash}.min.css`

var jsonValue = `{
  "indexCSS": "${MINIFIED_CSSFILE}"
}`
fs.writeFileSync(DATAFILE, jsonValue)
