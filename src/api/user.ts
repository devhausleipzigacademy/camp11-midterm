import axios from 'axios';
import { TLoginSchema, TRegisterSchema } from '../validation/schemas';

export async function registerUser(data: TRegisterSchema) {
   
      const response = await axios.post('http://localhost:8000/register', data);
      return response;
  };

  export async function loginUser(data: TLoginSchema) {

      const response = await axios.get('http://localhost:8000/login');
      return response
  }