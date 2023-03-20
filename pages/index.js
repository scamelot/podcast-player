// pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Episode from './episode';
import { getCachedEpisodes } from '../lib/feedService';

export default function Home() {
  const [episodes, setEpisodes] = useState([]);
  const router = useRouter();
  const { episodeIndex = 0 } = router.query;

  useEffect(() => {
    async function fetchData() {
      const latestEpisodes = await getCachedEpisodes();
      setEpisodes(latestEpisodes);
    }
    fetchData();
  }, []);

  const currentEpisode = episodes[episodeIndex] || {};
  const previousEpisodeIndex = Math.max(0, parseInt(episodeIndex, 10) - 1);
  const nextEpisodeIndex = Math.min(episodes.length - 1, parseInt(episodeIndex, 10) + 1);

  return (
    <div>
      { currentEpisode.enclosure ? (
      <div>
      <Episode episode={currentEpisode} />
      <div>
        <a href={`/?episodeIndex=${previousEpisodeIndex}`}>Previous</a>
        <a href={`/?episodeIndex=${nextEpisodeIndex}`}>Next</a>
      </div>
      </div>
      ) : (
  <h2>Loading...</h2>
      )}
    </div>
  );
}
