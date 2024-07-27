// hooks/useAuthState.js

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Ensure the path to your Firebase config is correct
import { useRouter } from 'next/navigation';

const useAuthState = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('/join'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuthState;
