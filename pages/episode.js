// pages/episode.js
import { useRouter } from 'next/router';

function Episode({ episode }) {
  const router = useRouter();
  const { episodeIndex } = router.query;
  return (
    <div>
    { episode ? (
    <div>
      <h2>{episode.title}</h2>
      <img src={episode.itunes.image} width='100px' height='100px'></img>
      <audio src={episode.enclosure.url} preload="none" controls></audio>
      <div dangerouslySetInnerHTML={{ __html: episode.content }}></div>
    </div> ) : (<h2>Loading...</h2>)}
    </div>
  );
}

export default Episode;
