import fs from "node:fs";
import path from "node:path";
import CleanCss from "clean-css";

const DATAFILE =  path.join(import.meta.dirname, '../data/csshash.json');
const CSSFILE = path.join(import.meta.dirname, '../public_html/assets/css/index.css');

const cssHash = JSON.parse(fs.readFileSync(DATAFILE, 'utf-8'));
const MINIFIED_CSSFILE = path.join(import.meta.dirname, `../public_html/assets/css/${cssHash.indexCSS}`);

const cssFile = fs.readFileSync(CSSFILE, 'utf-8');

const minified = new CleanCss({}).minify(cssFile).styles;

fs.unlinkSync(CSSFILE);
fs.writeFileSync(MINIFIED_CSSFILE, minified, 'utf-8');
