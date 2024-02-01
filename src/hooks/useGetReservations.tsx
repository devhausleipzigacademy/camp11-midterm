import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getReservations } from '../api/tickets';

function useGetReservations() {
  const { movieId } = useParams();

  const { data: reservations, ...rest } = useQuery({
    queryKey: ['reservations', movieId],
    queryFn: async () => await getReservations(movieId!),
  });
  return { reservations, ...rest };
}

export default useGetReservations;
