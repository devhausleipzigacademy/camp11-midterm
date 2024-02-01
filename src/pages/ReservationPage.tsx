import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import TicketPreviewPage from '../components/reservation/TicketPreviewPage';
import { useGetSingleMovie } from '../hooks/useGetSingleMovie';
import SelectTimePage from '../components/reservation/SelectTimePage';
import { useState } from 'react';
import SelectSeatsPage from '../components/reservation/SelectSeatsPage';
import { SingleMovie } from '../api/movies';
import useGetReservations from '../hooks/useGetReservations';

type selectPagesString =
  | 'selectTimePage'
  | 'selectSeatsPage'
  | 'ticketPreviewPage';

export type TicketInfo = {
  movieId: string;
  date: string;
  price: string;
  seat: string[];
  time: string;
  movie: SingleMovie | undefined;
};

function ReservationPage() {
  //fetched data
  const { movieId } = useParams();
  const { movie } = useGetSingleMovie();
  // we need to call it reservations from useGetReservations()
  const { reservations, isLoading, isError } = useGetReservations();

  //change current page
  const [currentPage, setCurrentPage] =
    useState<selectPagesString>('selectTimePage');

  //this information can be adjusted with the right fetched data

  const [ticketInformation, updateTicketInformation] = useState({
    movieId: movieId || '',
    date: '',
    price: '',
    seat: [''],
    time: '',
    movie,
  });

  // handle loading and error here, so we don't crash everything with undefined - also can't filter undefined reservations
  if (isLoading || isError || !reservations) {
    return <LoadingSpinner />;
  }

  const reservedSeats = reservations
    .filter(
      reservation =>
        reservation.date === ticketInformation.date &&
        reservation.time === ticketInformation.time
    )
    .flatMap(reservation => reservation.seat);

  return (
    <>
      {currentPage === 'selectTimePage' && (
        <SelectTimePage
          onNextClick={() => {
            setCurrentPage('selectSeatsPage');
          }}
          updateTimeInfo={dateTime => updateTicketInformation(dateTime)}
          ticketInfo={ticketInformation}
        />
      )}
      {currentPage === 'selectSeatsPage' && (
        <SelectSeatsPage
          onNextClick={() => {
            setCurrentPage('ticketPreviewPage');
          }}
          updateSeatInfo={seats => updateTicketInformation(seats)}
          ticketInfo={ticketInformation}
          reservationInfo={reservedSeats}
        />
      )}
      {currentPage === 'ticketPreviewPage' && (
        <TicketPreviewPage {...ticketInformation} movie={movie} />
      )}
    </>
  );
}

export default ReservationPage;
