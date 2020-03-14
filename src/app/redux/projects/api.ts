import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

export const getAllProjects = async () => {
  try {
    const result = await axios.get('/projects/getAllProjects');
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};