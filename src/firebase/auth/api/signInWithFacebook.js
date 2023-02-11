import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { Cookies } from "quasar";
import auth from "..";

const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const request = await signInWithPopup(auth, provider);
    Cookies.set("session", request.user, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    });

    return { message: `Welcome to IMGConvert ${request.user.displayName}` };
  } catch (error) {
    throw error;
  }
};

export default signInWithFacebook;
