import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { markdownLibrary } from "./bin/.markdown.js";
import CleanCSS from "clean-css";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  const getReadableDate = (locale, dateObj) => DateTime.fromJSDate(dateObj, {zone: 'utc', locale}).toFormat("dd LLL yyyy");

  eleventyConfig.addFilter("ru_readableDate", dateObj => {
    return getReadableDate('ru', dateObj);
  });

  eleventyConfig.addFilter("en_readableDate", dateObj => {
    return getReadableDate('en', dateObj);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc', locale: 'ru'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  eleventyConfig.addFilter("filterTagList", tags => {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  })

  eleventyConfig.addFilter("keys", obj => Object.keys(obj));

  eleventyConfig.addFilter("cssmin", (code) => {
    return new CleanCSS({}).minify(code);
  })

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return [...tagSet];
  });

  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("./src/assets/css/prism.css");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");

  const jsAssetsFiles = "./src/**/*.js"
  const cssAssetsFiles = "./src/assets/css/**/*.scss"
  const mdAssetsFiles = "./src/**/*.md"
  eleventyConfig.addWatchTarget(jsAssetsFiles)
  eleventyConfig.addWatchTarget(cssAssetsFiles)
  eleventyConfig.addWatchTarget(mdAssetsFiles)

  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
    ],

    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
      input: "src",
      includes: "_includes",
      data: "../data",
      output: "public_html",
    }
  };
};
