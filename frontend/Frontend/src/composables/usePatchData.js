import axios from 'axios';
import { ref } from 'vue';

export const usePatchData = () => {
  const response = ref(null);
  const error = ref(null);

  const patchData = async (url, payload) => {
    try {
      const result = await axios.patch(url, payload);
      response.value = result.data;
    } catch (err) {
      error.value = err;
      console.error('Error en PATCH:', err);
    }
  };

  return {
    patchData,
    response,
    error,
  };
};
