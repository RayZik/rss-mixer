// @ts-check
import Parser from 'rss-parser';
import logger from '../utils/logger';


export type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content?: string;
  contentSnippet?: string;
  language?: string;
  categories?: string[]
  comments?: string;
  source: string;
}

type AdditionalFields = { language?: string };

export type RssFeedResponse = AdditionalFields & Parser.Output<FeedItem>;

export async function fetchRSSFeed(url: string): Promise<RssFeedResponse> {
  const parser = new Parser<AdditionalFields, FeedItem>();

  try {
    const feed = await parser.parseURL(url);
    logger.info(`Successfully fetched feed from ${url}`);

    feed.items.forEach(item => {
      item.language = feed.language;
      item.source = url;
    });

    return feed;
  } catch (error) {
    const err = error as Error;
    logger.error(`Failed to fetch RSS feed from ${url}: ${err.message}`);
    throw error;
  }
}