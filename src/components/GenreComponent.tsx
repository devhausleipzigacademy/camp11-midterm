import { useContext } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { GenreContext } from '../context/GenreProvider';
import GenreButton from '../components/GenreButton';

type GenreType = {
  genre: string;
  emoji: string;
  id: number;
  isSelected: boolean;
};

function GenreComponent() {
  //data
  const { genres, updateGenre, selectedCount } = useContext(GenreContext);

  //return component in css
  function generateButton(genre: GenreType) {
    return (
      <GenreButton
        onClick={() => {
          updateGenre(genre.id);
        }}
        key={genre.id}
        genreIcon={genre.emoji}
        active={genre.isSelected}
        genre={genre.genre}
      />
    );
  }

  //return generateButton with genre
  let counter = 0;
  function mapGenres(genre: GenreType) {
    //4 defaultnumber of genres displayed on homepage
    if (counter < 4) {
      if (counter < 4 - selectedCount || genre.isSelected) {
        if (
          !genre.isSelected ||
          (genre.isSelected && counter >= 4 - selectedCount)
        ) {
          counter++; //useState
        }
        return generateButton(genre);
      }
    }
  }

  //navigate
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/genres');
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center font-semibold text-base text-white justify-between opacity-[.44]">
        <h2>Genre</h2>
        <button
          className="flex items-center gap-x-3 text-primary font-medium text-xs"
          onClick={handleClick}
        >
          <span>See All</span>
          {<IoIosArrowForward />}
        </button>
      </div>
      <div className="flex flex-wrap justify-between">
        {genres.map(genre => mapGenres(genre))}
      </div>
    </div>
  );
}

export default GenreComponent;
