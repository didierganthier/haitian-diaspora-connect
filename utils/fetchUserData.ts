import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

async function fetchUserData(userId: any) {
  try {
    const userDoc = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export default fetchUserData;
