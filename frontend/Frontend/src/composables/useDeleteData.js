import axios from 'axios';
import { ref } from 'vue';

export const useDeleteData = () => {
  const response = ref(null);
  const error = ref(null);

  const deleteData = async (url) => {
    try {
      const result = await axios.delete(url);
      response.value = result.data;
    } catch (err) {
      error.value = err;
      console.error('Error en DELETE:', err);
    }
  };

  return {
    deleteData,
    response,
    error,
  };
};
