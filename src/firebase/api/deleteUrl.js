import { doc, deleteDoc } from "firebase/firestore";
import db from "../db";

const deleteUrl = async (id) => {
  try {
    await deleteDoc(doc(db, `urls/${id}`));
    return { message: "The image is deleted correctly 😁", state: true };
  } catch (error) {
    throw { message: "Error al eliminar la url 😫", error };
  }
};

export default deleteUrl;
