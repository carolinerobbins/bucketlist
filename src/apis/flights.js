import axios from 'axios';

export const getNonStop = async (departure) => {
  try {
    const response = await axios.get('http://localhost:3001/flights/nonstop', {
      params: {
        departure,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nonstop flights:', error);
    return null;
  }
};

export const getPrices = async (origin, destination) => {
  try {
    const response = await axios.get('http://localhost:3001/flights/price', {
      params: {
        origin,
        destination
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nonstop flights:', error);
    return null;
  }
};