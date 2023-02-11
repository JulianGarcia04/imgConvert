import { doc, setDoc, writeBatch } from "firebase/firestore";
import { v4 } from "uuid";
import db from "..";

const addUrls = async (urls, idUser) => {
  try {
    const batch = writeBatch(db);
    urls.forEach((url) => {
      const id = v4();
      batch.set(doc(db, "urls", id), {
        url: url.url,
        idUser,
        filename: url.filename,
      });
    });
    await batch.commit();
    return true;
  } catch (error) {
    throw {
      message:
        "internal error to upload image, please contact with the team 👽",
      error,
    };
  }
};

export default addUrls;
