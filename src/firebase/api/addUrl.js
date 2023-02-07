import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import db from "../db";

const addUrl = async (url, idUser, filename) => {
  try {
    const id = v4();
    const request = await setDoc(doc(db, "urls", id), {
      id,
      url,
      idUser,
      filename,
    });
    return request;
  } catch (error) {
    throw { message: "error interno, please contact with the team", error };
  }
};

export default addUrl;
