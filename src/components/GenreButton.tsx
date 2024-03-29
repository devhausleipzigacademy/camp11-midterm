import React from 'react';
import { cn } from '../utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends ButtonProps {
  active: boolean;
  genre: string;
  genreIcon: string;
}

function GenreButton({ active, genre, genreIcon, ...props }: Props) {
  return (
    <div className="flex flex-col justify-center gap-2 w-fit">
      <button
        {...props}
        className={cn(
          'rounded-[0.75rem] flex flex-col items-center justify-center text-3xl w-14 h-14',
          active ? 'bg-white-dimmed' : 'bg-dark-light'
        )}
      >
        <p className="w-full text-center">{genreIcon}</p>
      </button>
      <div className="flex whitespace-nowrap justify-center text-center w-14">
        <h5 className="text-xs font-bold text-white-dimmed">{genre}</h5>
      </div>
    </div>
  );
}

export default GenreButton;
