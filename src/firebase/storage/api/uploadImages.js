import { ref, uploadBytes } from "firebase/storage";
import getImageUrl from "./getImageUrl";
import storage from "..";

const uploadImages = async (images, username) => {
  try {
    if (!images || images.length === 0) {
      throw { message: "must select at less one image 🤨" };
    }
    const urls = [];
    for (const image of images) {
      const refStorage = ref(storage, `${username}/${image.file.name}`);
      const reqUpload = await uploadBytes(refStorage, image.file);
      const reqGetUrl = await getImageUrl(username, image.file.name);
      urls.push({ filename: refStorage.name, url: reqGetUrl });
    }
    return {
      message: "The image did uploaded correctly 🥳",
      urls,
    };
  } catch (error) {
    throw error;
  }
};

export default uploadImages;
