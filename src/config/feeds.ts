const FEEDS_RU = [
  'https://habr.com/ru/rss/articles',
  'https://tproger.ru/feed/',
];

const FEEDS_EN = [
  'https://www.reddit.com/r/technology/.rss',
  'https://css-tricks.com/feed/',
  'https://www.smashingmagazine.com/feed/',
  'https://stackoverflow.blog/feed/',
  'https://dev.to/feed',
  'https://hacks.mozilla.org/feed/',
  'http://feeds.arstechnica.com/arstechnica/index',
  'https://techcrunch.com/feed/',
];

export const getFeeds = (): string[] => {
  const probability = Math.random();

  return probability < 0.5 ? FEEDS_RU : FEEDS_EN;
};
