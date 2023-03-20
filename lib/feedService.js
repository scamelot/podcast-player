// lib/feedService.js
import Parser from 'rss-parser';

const FEEDS = ['https://atp.fm/rss', 'https://feeds.megaphone.fm/darknetdiaries', 'https://feeds.simplecast.com/1_9aBk7M', 'https://daringfireball.net/thetalkshow/rss', 'https://feeds.redcircle.com/92bf9085-a91e-49f6-81b8-5b651b52ba3f?_ga=2.40878434.1504349826.1678823285-1290121214.1678823285', 'https://feed.podbean.com/geekanddestroy/feed.xml', 'https://podcast.panic.com/index.xml', 'https://rss.art19.com/business-movers'];


const CACHE_TTL = 60 * 60 * 1000; // cache feed data for 1 hour
let cache = {
  timestamp: 0,
  data: [],
};

async function getLatestEpisodes(feeds) {
    const latestEpisodes = [];
    for (const feed of feeds) {
        const response = await fetch(`/api/proxy?feedUrl=${encodeURIComponent(feed)}`);
        const fetchedEpisodes = await response.json();
        console.log(fetchedEpisodes)
        let episodes = []
        episodes.push(...fetchedEpisodes)
        latestEpisodes.push(...episodes);
    }
  
    // Randomize the episode list
    await latestEpisodes.sort(() => Math.random() - 0.5);
    console.log(latestEpisodes)
    return latestEpisodes;
  }
  

export async function getCachedEpisodes() {
  const now = Date.now();
  if (cache.timestamp + CACHE_TTL > now) {
    return cache.data;
  }

  const latestEpisodes = await getLatestEpisodes(FEEDS);
  cache = {
    timestamp: now,
    data: latestEpisodes,
  };
  return latestEpisodes;
}
