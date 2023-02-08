import { ref, uploadBytes } from "firebase/storage";
import getImageUrl from "./getImageUrl";
import storage from "../storage";

const uploadImage = async (image, username, isEmptyInput) => {
  try {
    if (!image || isEmptyInput) {
      throw { message: "must select a image 🤨" };
    }
    const refStorage = ref(storage, `${username}/${image.name}`);
    const reqUpload = await uploadBytes(refStorage, image);
    const reqGetUrl = await getImageUrl(username, image.name);
    if (reqGetUrl) {
      return {
        message: "The image did uploaded correctly 🥳",
        url: reqGetUrl,
        metadata: reqUpload.metadata,
      };
    }
  } catch (error) {
    throw error;
  }
};

export default uploadImage;
