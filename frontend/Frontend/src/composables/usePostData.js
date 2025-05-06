import axios from 'axios';

export const usePostData = () => {
  const postData = async (url, data, config = {}) => {
    try {
      const res = await axios.post(url, data, config);
      return { response: res, error: null };
    } catch (error) {
      const mensaje = error?.response?.data?.error || "Error inesperado";
      console.error("Error en POST:", mensaje);
      throw new Error(mensaje);
    }
  };
  return { postData };
};

