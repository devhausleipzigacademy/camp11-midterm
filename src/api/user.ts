import axios from 'axios';
import { TLoginSchema, TRegisterSchema } from '../validation/schemas';
import { FormData } from '../components/ProfileForm';


// Axios Await for RegisterPage.tsx
export async function registerUser(data: TRegisterSchema) {
      const response = await axios.post('http://localhost:8000/register', data);
      return response;
  };

// Axios Await for LoginPage.tsx
export async function loginUser(data: TLoginSchema) {
    const response = await axios.post('http://localhost:8000/login', data);
    return response
  }

// Axios Await for ProfilePage.tsx
  export async function fetchUserById(userId: string) {
    const response = await axios.get(`http://localhost:8000/user/${userId}`);
    return response
  }

// Axios Await for ProfilePage.tsx
  export async function updateUserById(userId: string, userData: FormData) {
    const response = await axios.put(`http://localhost:8000/user/${userId}`, userData);
    return response
  }