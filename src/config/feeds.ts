const FEEDS_RU = [
  'https://habr.com/ru/rss/articles',
  'https://tproger.ru/feed/',
  'https://www.computerra.ru/feed/',
  'https://devby.io/rss',
]

const FEEDS_EN = [
  // 'https://news.ycombinator.com/rss',
  // 'https://www.reddit.com/r/technology/.rss',
  // 'https://css-tricks.com/feed/',
  // 'https://www.smashingmagazine.com/feed/'
  // 'https://stackoverflow.blog/feed/',
  // 'https://dev.to/feed',
  'https://hacks.mozilla.org/feed/'
  // 'http://feeds.arstechnica.com/arstechnica/index',
  // 'https://techcrunch.com/feed/',
]

export const getFeeds = (): string[] => {
  const probability = Math.random();
  return FEEDS_RU;
  // return FEEDS_EN;
  // return probability < 0.7 ? FEEDS_RU : FEEDS_EN;
};