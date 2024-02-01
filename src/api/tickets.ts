import axios from 'axios';
import { TicketInfo } from '../pages/ReservationPage';

// send ticket info to server
export async function handleBookTicket(ticketInfo: TicketInfo) {
  try {
    const response = await axios.post(
      'http://localhost:8000/reservation',
      ticketInfo,
      {
        headers: {
          accept: 'application/json',
        },
        withCredentials: true,
      }
    );

    console.log('RESPONSE', response.data); // Handle success
    // You can navigate to a success page or show a success message here
    return response.data;
  } catch (error) {
    console.error('There was a problem with the reservation:', error); // Handle errors
    throw error;
  }
}

// fetch reservations from server
const PORT = 8000;

export async function getReservations(movieId: string) {
  try {
    const response = await axios.get<TicketInfo[]>(
      `http://localhost:${PORT}/reservation/${movieId}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
    return await response.data;
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
}
