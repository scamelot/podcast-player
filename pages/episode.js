// pages/episode.js
import { useRouter } from 'next/router';

function Episode({ episode }) {
  const router = useRouter();
  const { episodeIndex } = router.query;
  return (
    <div>
    { episode ? (
     <div className="bg-white shadow-md rounded-lg p-6 my-4 w-full flex flex-col items-center">
     <h2 className="text-xl font-semibold text-gray-700 mb-4">{episode.title}</h2>
     <img src={episode.itunes.image} className="w-64 h-64 my-2 object-cover rounded-lg shadow-md"></img>
     <audio
       src={episode.enclosure.url}
       preload="none"
       controls
       className="w-full mb-4"
     />
     <div className="text-gray-700" dangerouslySetInnerHTML={{__html: episode.content}} />
   </div> ) : (<h2 className="text-gray-700">Loading...</h2>)}
    </div>
  );
}

export default Episode;
