import { collection, addDoc } from "firebase/firestore";
import db from "../db";

const addUrl = async (url, idUser) => {
  try {
    const request = await addDoc(collection(db, "urls"), {
      url,
      idUser,
    });
    return request;
  } catch (error) {
    throw { message: "error interno, please contact with the team" };
  }
};

export default addUrl;
