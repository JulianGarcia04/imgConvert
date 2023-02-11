import { getDocs, doc, query, where, collection } from "firebase/firestore";
import db from "..";

const getUser = async (username) => {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const request = await getDocs(q);
    if (!request.empty) {
      return false;
    }

    return request.docs;
  } catch (error) {
    throw error;
  }
};

export default getUser;
