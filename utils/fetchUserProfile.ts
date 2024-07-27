import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = doc(db, "users", uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return 'User not found';
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new Error("Failed to fetch user profile");
    }
  };

  export default fetchUserProfile;