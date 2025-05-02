// composables/useGoogleAuth.js
import { auth, provider, signInWithPopup } from '../firebase/firebaseConfig';
import { ref } from 'vue';

export function useGoogleAuth() {
  const user = ref(null);
  const error = ref(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      user.value = { name: displayName, email };
    } catch (err) {
      error.value = err.message;
    }
  };

  return { user, error, signInWithGoogle };
}
