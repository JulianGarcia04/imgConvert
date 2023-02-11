import { getDocs, query, where, collection } from "firebase/firestore";
import db from "..";

const getAllImages = async (uid) => {
  try {
    const collectionRef = collection(db, "urls");
    const q = query(collectionRef, where("idUser", "==", uid));
    const request = await getDocs(q);
    const images = [];
    request.forEach((imageUrl) => {
      const id = imageUrl.id;
      const data = imageUrl.data();
      images.push({ id, ...data });
    });
    return { data: images, isEmpty: request.empty };
  } catch (error) {
    throw error;
  }
};

export default getAllImages;
