// pages/api/proxy.js
import { parse } from 'path';
import Parser from 'rss-parser';

export default async function handler(req, res) {
  const { feedUrl } = req.query;
  const parser = new Parser()
  let episodes = []
  if (!feedUrl) {
    res.status(400).json({ error: 'Please provide a feed URL' });
    return;
  }
    const feedData = await parser.parseURL(feedUrl)
    for (let data of feedData.items.slice(0,3)) {
        episodes.push(data)
    }
    console.log(episodes)
    res.status(200).json(episodes);
    return;
}
