import { ref, getDownloadURL } from "firebase/storage";
import storage from "..";

const getImageUrl = async (username, filename) => {
  try {
    if (!username || !filename) {
      throw { message: "image not found" };
    }
    const listRef = ref(storage, `${username}/${filename}`);
    const request = await getDownloadURL(listRef);
    return request;
  } catch (error) {
    throw { message: "the image didn't founded" };
  }
};

export default getImageUrl;
