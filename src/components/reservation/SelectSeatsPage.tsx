import { useEffect } from 'react';
import { useState } from 'react';
import Modal from './Modal';
import Header from '../../components/Header';
import { Transition } from '@headlessui/react';
import { TicketInfo } from '../../pages/ReservationPage';
import { cn } from '../../utils/cn';

//onNextClick to render new UI
type SelectSeatsPageProps = {
  onNextClick: () => void;
  updateSeatInfo: (seats: TicketInfo) => void;
  ticketInfo: TicketInfo;
  reservationInfo: string[];
};

export type Seat = {
  name: string | null;
  isSelected: boolean;
  isReserved: boolean;
};

function generateSeats() {
  // the following comment prevents prettier of formatting the matrix - do not remove!
  // prettier-ignore
  const seats = [ null, 'A1', 'A2', 'A3',  null, 'A4', 'A5', 'A6',  null,
                  'B1', 'B2', 'B3', 'B4',  null, 'B5', 'B6', 'B7',  'B8',
                  'C1', 'C2', 'C3', 'C4',  null, 'C5', 'C6', 'C7',  'C8',
                  'D1', 'D2', 'D3', 'D4',  null, 'D5', 'D6', 'D7',  'D8',
                  'E1', 'E2', 'E3', 'E4',  null, 'E5', 'E6', 'E7',  'E8',
                  null, 'F1', 'F2', 'F3',  null, 'F4', 'F5', 'F6',  null,];

  const seatObj: Seat[] = seats.map((seat, idx) => {
    return { name: seat, isSelected: false, isReserved: false };
  });
  return seatObj;
}

function SelectSeatsPage({
  onNextClick,
  updateSeatInfo,
  ticketInfo,
  reservationInfo,
}: SelectSeatsPageProps) {
  const [seatsInfo, setSeatsInfo] = useState(() => generateSeats());
  const [isShown, setIsShown] = useState(false);

  const selectedSeats = seatsInfo.filter(seat => seat.isSelected);

  // logic for checking via seatsName if seats are reserved
  const isSeatReserved = (seatName: string) =>
    reservationInfo.includes(seatName);

  function handleClick(seatId: number) {
    setSeatsInfo(prevSeats =>
      prevSeats.map((seat, idx) =>
        idx === seatId ? { ...seat, isSelected: !seat.isSelected } : seat
      )
    );
  }

  useEffect(() => {
    setIsShown(selectedSeats.length > 0);
  }, [selectedSeats]);

  return (
    <>
      <Header header="Select Seats" />
      <div className="flex flex-col items-center mb-[32px]">
        <div className="w-[279px] h-[5px] bg-[#FFB43A] mt-[48px]"></div>
        <div className="w-[279px] h-[20px] bg-gradient-to-b from-[#FFB43A] opacity-20"></div>
      </div>
      <div className="grid grid-cols-9 gap-3 auto-rows-max">
        {seatsInfo.map((seat, idx) => {
          if (!seat.name) {
            return <div className="w-[28px] h-[28px]" key={idx}></div>;
          }

          // we call isSeatReserved in here to determine if the current seat that gets rendered is reserved
          const seatReserved = isSeatReserved(seat.name);

          return seatReserved ? (
            <div
              className="w-[28px] h-[28px] bg-white text-white rounded text-xs"
              key={idx}
            >
              {seat.name}
            </div>
          ) : (
            <button
              className={cn(
                'w-[28px] h-[28px] text-white-dimmed rounded text-xs',
                seat.isSelected ? 'bg-[#FFB43A]' : 'bg-dark-light'
              )}
              key={idx}
              onClick={() => {
                handleClick(idx);
              }}
            >
              {seat.name}
            </button>
          );
        })}
      </div>
      <div className="flex justify-evenly pt-[24px]">
        <div className="flex gap-[6px] items-center">
          <div className="w-[16px] h-[16px] rounded-full bg-dark-light"></div>
          <span className="text-white-dimmed text-xs font-medium">
            Available
          </span>
        </div>
        <div className="flex gap-[6px] items-center">
          <div className="w-[16px] h-[16px] rounded-full bg-[#FFB43A]"></div>
          <span className="text-white-dimmed text-xs font-medium">
            Selected
          </span>
        </div>
        <div className="flex gap-[6px] items-center">
          <div className="w-[16px] h-[16px] rounded-full bg-white"></div>
          <span className="text-white-dimmed text-xs font-medium">
            Reserved
          </span>
        </div>
      </div>
      <Transition
        show={isShown}
        enter="transition-all duration-300"
        enterFrom="opacity-0 translate-y-[250px]"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 translate-y-[250px]"
        className="fixed bottom-0"
      >
        <Modal
          onNextClick={onNextClick}
          selectedSeats={selectedSeats}
          updateSeatInfo={seats => updateSeatInfo(seats)}
          ticketInfo={ticketInfo}
        />
      </Transition>
    </>
  );
}

export default SelectSeatsPage;
