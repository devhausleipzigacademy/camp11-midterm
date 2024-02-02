import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProfileForm from '../components/ProfileForm';
import { Props } from '../components/HomePageHeader';
import { FormData } from '../components/ProfileForm';
import { profileSchema } from '../../server/schema/profileSchema';
import { fetchUserById, updateUserById } from '../api/user';

function ProfilePage({ name, avatarImg }: Props) {
  const [user, setUser] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const userId = '6ef98797-9fcd-4a43-b154-d27483dc01eb';

    fetchUserById(userId)
    .then(response => {
      const user = response.data as FormData;
      setUser(user);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
    });
}, []);
      

  const handleProfileSubmit = (user: FormData) => {
    const userId = '6ef98797-9fcd-4a43-b154-d27483dc01eb';
    updateUserById(userId, user)
      .then(() => {
      setUser(user);
      console.log('Profile data updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating profile data:', error);
    })
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between gap-5">
        <Header header="Profile"></Header>
        <div className="flex justify-center">
          {user !== null ? (
            <img
              alt={name}
              src={`https://source.unsplash.com/random/?person`} // <-- Adjust as needed, should be replaced by that-> {avatarImg}
              className="w-[220px] h-[220px] rounded-full object-cover"
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <ProfileForm
          initialData={user}
          //onChange={setUser}
          onSubmit={handleProfileSubmit}
        />
      </div>
    </>
  );
}

export default ProfilePage;
