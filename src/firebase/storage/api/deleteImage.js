import { ref, deleteObject } from "firebase/storage";
import storage from "..";

const deleteImage = async (username, filename) => {
  try {
    const desetRef = ref(storage, `${username}/${filename}`);
    await deleteObject(desetRef);

    return { message: "image was deleted correctly 🥳" };
  } catch (error) {
    throw { message: "error al eliminar la imagen 😭", error };
  }
};

export default deleteImage;
