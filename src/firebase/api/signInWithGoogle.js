import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { Cookies } from "quasar";
import auth from "../auth";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const request = await signInWithPopup(auth, provider);
    const credentials = GoogleAuthProvider.credentialFromResult(request);
    const token = credentials.accessToken;
    const user = request.user;

    Cookies.set("session", request.user, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    });

    return { message: `Welcome to IMGConvert ${request.user.displayName}` };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    throw credential;
    // ...
  }
};

export default signInWithGoogle;
