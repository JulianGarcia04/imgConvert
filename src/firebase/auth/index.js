import app from "..";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const auth = getAuth(app);

if (process.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export default auth;
