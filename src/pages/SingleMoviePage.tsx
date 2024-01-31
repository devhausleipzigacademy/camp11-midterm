import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { findCrewByRole } from '../utils/findCrewByRole';
import Button from '../components/Button';
import Score from '../components/Score';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useGetSingleMovie } from '../hooks/useGetSingleMovie';
import notFoundImage from '../assets/whiteScreen_404unicornNotFound.png';
import { cn } from '../utils/cn';
import axios from 'axios';

function SingleMoviePage() {
  //SingleMovie data
  const { movieId } = useParams();
  const { movie } = useGetSingleMovie();
  const PORT = '8000';

  // crew data
  const membersData = movie ? movie.credits.crew : [];
  const writer = findCrewByRole(membersData, 'Writer');
  const director = findCrewByRole(membersData, 'Director');
  const unknownWriter = writer ? writer.name : 'Unknown Writer';

  const genres = movie?.genres.map(genre => {
    return genre.name;
  });

  //toggle read more
  const [isOpen, setIsOpen] = useState(false);

  // const clickHandler = () => {}

  const [favorite, setFavorite] = useState(false);

  const fetchSingleFavData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:${PORT}/movies/${movieId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { data } = response;
      // console.log(data);
      setFavorite(data.message);
      return data.message;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const switchFavData = async () => {
    try {
      const response = await fetch(
        `http://localhost:${PORT}/movies/${movieId}`,
        {
          method: favorite ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      setFavorite(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSingleFavData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="">
        <Header
          header="Movie Detail"
          icon={
            <div onClick={switchFavData}>
              {favorite ? (
                <FaHeart className="text-error" />
              ) : (
                <FaRegHeart className="text-error" />
              )}
            </div>
          }
        />
      </div>

      {movie && (
        <img
          key={movie.id}
          className="rounded-lg"
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
              : notFoundImage
          }
        />
      )}

      <h1 className="text-white font-bold">{movie?.title}</h1>
      <div className=" text-white text-xs flex justify-between">
        <div className="flex gap-6">
          <span>{movie?.release_date.slice(0, 4)}</span>
          <span className="text-white-dimmed">
            {genres?.slice(0, 2).join('/')}
          </span>
          <span className="text-white-dimmed">
            {movie &&
              Math.floor(movie.runtime / 60) +
                'h ' +
                (movie.runtime % 60) +
                'm'}
          </span>
        </div>

        {movie && <Score voteAverage={movie.vote_average} />}
      </div>
      <div className="flex justify-between text-xs">
        <div className="flex flex-col gap-2 text-white-dimmed">
          <span>Director: </span>
          <span>Writer: </span>
        </div>
        <div className="flex flex-col gap-2 font-bold text-white">
          <span>{director?.name}</span>
          <span>{unknownWriter}</span>
        </div>
        <div className="w-[140px] text-white">
          <Link to={`/movies/${movieId}/cast-crew`}>
            <Button size="sm" variant="secondary">
              Cast & Crew
            </Button>
          </Link>
        </div>
      </div>
      <hr className="border-white-dimmed" />
      <div className="flex flex-col gap-2 items-start">
        <span className="text-white font-bold text-sm">Synopsis</span>
        <p
          className={cn('text-white-dimmed text-sm', !isOpen && 'line-clamp-2')}
        >
          {movie?.overview}
        </p>
        <button
          className="text-sm underline text-[#FFB43A]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Read less' : 'Read more'}
        </button>
      </div>
      <Link to={`/movies/${movieId}/reservation`}>
        <Button size="lg">Get Reservation</Button>
      </Link>
    </div>
  );
}

export default SingleMoviePage;
