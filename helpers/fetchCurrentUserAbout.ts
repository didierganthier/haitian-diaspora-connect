import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const fetchCurrentUserAbout = async (id: string) => {
    const userDoc = await getDoc(doc(db, "users", id));
    if(userDoc.exists()) {
      return userDoc.data().about;
    } else {
      return null;
    }
  }

  export default fetchCurrentUserAbout;