import fs from "node:fs";
import path from "node:path";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
// import markdownItContainer from "markdown-it-container";

const linkIcon = fs.readFileSync(path.join(import.meta.dirname, "../src/_includes/icons/link.svg"), "utf8");

let markdownLibrary = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.linkInsideHeader({
    class: "direct-link",
    symbol: linkIcon,
  })
});

export {
  markdownLibrary
}
