const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
// const markdownItContainer = require("markdown-it-container");
const fs = require("fs");
const path = require("path");

const linkIcon = fs.readFileSync(path.join(__dirname, "../src/_includes/icons/link.svg"));

let markdownLibrary = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
}).use(markdownItAnchor, {
  permalink: true,
  permalinkClass: "direct-link",
  permalinkSymbol: linkIcon
});

module.exports = {
  markdownLibrary
}
