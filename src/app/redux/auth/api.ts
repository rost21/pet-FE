import axios from 'axios';
import { IRegisterUserVariables, ILoginUserVariables, IGetUserVariables } from 'app/redux/types';

axios.defaults.baseURL = 'http://localhost:3001';

export const registration = async (newUser: IRegisterUserVariables) => {
  try {
    const result = await axios.post('/auth/register', newUser);
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};

export const login = async (user: ILoginUserVariables) => {
  try {
    const result = await axios.post('/auth/login', user);
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getUser = async (token: IGetUserVariables) => {
  try {
    const result = await axios.post('/auth/getUser', token);
    return result.data
  } catch (e) {
    return e.response.data;
  }
}