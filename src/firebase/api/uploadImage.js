import { ref, uploadBytes } from "firebase/storage";
import storage from "../storage";

const uploadImage = async (image, username) => {
  try {
    if (!image) {
      throw { message: "must select a image" };
    }
    const refStorage = ref(storage, `${username}/${image.name}`);
    const request = await uploadBytes(refStorage, image);
    console.log(request);
    if (request.metadata) {
      return { message: "The image did uploaded correctly" };
    }
  } catch (error) {
    throw { message: "error to the upload the image" };
  }
};

export default uploadImage;
