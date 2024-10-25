// @ts-check
import Parser from 'rss-parser';
import logger from '../utils/logger';

const parser = new Parser();

export type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content?: string;
  contentSnippet?: string;
}

export async function fetchRSSFeed(url: string): Promise<FeedItem[]> {
  try {
    const feed = await parser.parseURL(url);
    logger.info(`Successfully fetched feed from ${url}`);

    return feed.items as FeedItem[];
  } catch (error) {
    const err = error as Error;
    logger.error(`Failed to fetch RSS feed from ${url}: ${err.message}`);
    return [];
  }
}