import { collection, addDoc } from "firebase/firestore";
import db from "../db";

const addUser = async (username, fullname, email) => {
  try {
    const request = await addDoc(collection(db, "users"), {
      username,
      fullname,
      email,
    });
    return request;
  } catch (error) {
    throw error;
  }
};

export default addUser;
