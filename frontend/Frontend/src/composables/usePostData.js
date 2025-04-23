import axios from 'axios';

export const usePostData = () => {
  const postData = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return { response: response.data, error: null };
    } catch (error) {
      const mensaje = error?.response?.data?.error || "Error inesperado";
      console.error("Error en POST:", mensaje);
      throw new Error(mensaje); // Lanzamos el error para que el frontend lo capture  
    }
  };
  return { postData };
};
