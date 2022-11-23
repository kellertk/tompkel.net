const url = process.env.URL ?? "https://www.tompkel.net";
const title = "Hello and welcome";

module.exports = {
  en: {
    url,
    title,
    description: "It's a website ok thanks",
    feed: {
      subtitle: "tompkel.net",
      filename: "feed.xml",
      path: "/feed/en.feed.xml",
      id: "tompkel.net",
    },
    jsonfeed: {
      path: "/feed/en.feed.json",
      url: `${url}/feed/en.feed.json`,
    },
    source: {
      label: 'github',
      link: 'https://github.com/kellertk/tompkel.net'
    },
    author: {
      url,
      name: "Tom K.",
      email: "tom@tompkel.net",
      twitter: "@maleckii",
      linkedin: 'tom-keller',
      printables: 'https://www.printables.com/social/281732-maleckii/models',
      github: 'kellertk',
    },
    posts: {
      title: `Posts | ${title}`,
      description: "Blog posts list",
    },
    about: {
      title: `About | ${title}`,
    },
  },
};
