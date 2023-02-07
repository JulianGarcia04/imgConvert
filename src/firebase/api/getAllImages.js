import { getDocs, query, where, collection } from "firebase/firestore";
import db from "../db";

const getAllImages = async (uid) => {
  try {
    const collectionRef = collection(db, "urls");
    const q = query(collectionRef, where("idUser", "==", uid));
    const request = await getDocs(q);
    const images = [];
    request.forEach((imageUrl) => {
      const data = imageUrl.data();
      images.push(data);
    });
    return { data: images, isEmpty: request.empty };
  } catch (error) {
    throw error;
  }
};

export default getAllImages;
