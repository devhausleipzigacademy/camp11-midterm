import React, { createContext, useEffect, useState } from 'react';
import { genresLibraryType } from '../utils/genresLibraryType';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  genres: genresLibraryType[];
  updateGenre: (id: number) => void;
  selectedCount: number;
};

export const GenreContext = createContext<ContextType>({
  genres: [],
  updateGenre: () => {},
  selectedCount: 0,
});

//local storage
//1. get items
const storedGenresString = localStorage.getItem('genres');

function GenreProvider({ children }: Props) {
  const [genres, setGenres] = useState<genresLibraryType[]>([]);
  //set count
  const [selectedCount, SetSelectedCount] = useState(0);

  useEffect(() => {
    axios.get<genresLibraryType[]>('http://localhost:8000/genres').then(res => {
      //local storage
      const storedGenres = storedGenresString
        ? JSON.parse(storedGenresString)
        : res.data;

      setGenres(
        storedGenres.sort((a: genresLibraryType, b: genresLibraryType) => {
          return a.genre < b.genre ? -1 : 1;
        }) ||
          res.data.sort((a, b) => {
            return a.genre < b.genre ? -1 : 1;
          })
      );
    });
  }, []);

  useEffect(() => {
    const count = genres.filter(genre => genre.isSelected).length;
    SetSelectedCount(count);
  }, [genres]);

  //toggle GenreButton
  function updateGenre(genreId: number) {
    const updatedGenres = genres.map(genre => {
      if (genre.id === genreId) {
        genre.isSelected = !genre.isSelected;
      }
      return genre;
    });
    setGenres(updatedGenres);
    //handing the updatedGenres to saveLocalStorage function
    saveLocalStorage(updatedGenres);
  }

  //passing genres state to localstorage and set them in 'genres'
  const saveLocalStorage = (genres: genresLibraryType[]) => {
    localStorage.setItem('genres', JSON.stringify(genres));
  };

  return (
    <>
      <GenreContext.Provider value={{ genres, updateGenre, selectedCount }}>
        {children}
      </GenreContext.Provider>
    </>
  );
}

export default GenreProvider;
