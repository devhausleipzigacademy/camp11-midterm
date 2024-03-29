import Header from '../components/Header';
import { useGetSingleMovie } from '../hooks/useGetSingleMovie';
import { Tab } from '@headlessui/react';
import CastCrewTab from '../components/castAndCrew/CastCrewTab';
import CastCrewTabPanel from '../components/castAndCrew/CastCrewTabPanel';

function CastAndCrewPage() {
  // We can use our hook to get access to a single movie
  const { movie } = useGetSingleMovie();

  // task 3: fetch cast and crew data
  const castData = movie ? movie.credits.cast : [];
  const crewData = movie ? movie.credits.crew : [];

  // task 4: console log the cast and crew data on the page
  console.log(castData);
  console.log(crewData);

  return (
    <>
      <div className="flex flex-col gap-6 h-full">
        <Tab.Group>
          <div className="sticky top-0 z-10 bg-dark flex flex-col gap-6">
            <Header header="Cast & Crew" />
            <Tab.List className="flex gap-6 text-sm font-medium justify-center pt-2">
              <CastCrewTab>Cast</CastCrewTab>
              <CastCrewTab>Crew</CastCrewTab>
            </Tab.List>
          </div>
          <div className="overflow-y-auto">
            <Tab.Panels>
              <Tab.Panel>
                <CastCrewTabPanel data={castData}></CastCrewTabPanel>
              </Tab.Panel>
              <Tab.Panel>
                <CastCrewTabPanel data={crewData}></CastCrewTabPanel>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </>
  );
}

export default CastAndCrewPage;
