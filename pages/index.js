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
      <div className="flex justify-between mt-4">
        <a className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2" href={`/?episodeIndex=${previousEpisodeIndex}`}>Previous</a>
        <a className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"href={`/?episodeIndex=${nextEpisodeIndex}`}>Next</a>
      </div>
      </div>
      ) : ( 
  <h2>Loading...</h2>
      )}
    </div>
  );
}
