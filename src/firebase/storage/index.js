import { getStorage, connectStorageEmulator } from "firebase/storage";
import app from "..";

const storage = getStorage(app);

if (process.env.DEV) {
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export default storage;
