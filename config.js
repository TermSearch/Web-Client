let siteUrl = "http://localhost:3000/";

if (process.env.NODE_ENV === 'production') {
  siteUrl = "https://term-search.nl/"
}

export default {
  siteUrl
};
