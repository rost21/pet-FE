import axios from 'axios';
import { IRegisterUserVariables } from 'app/components/types';

axios.defaults.baseURL = 'http://localhost:3001';

export const registration = (newUser: IRegisterUserVariables) =>
  axios
    .post('/auth/register', newUser)
    .then((result) => result.data)
    .catch((error) => error.response.data);
