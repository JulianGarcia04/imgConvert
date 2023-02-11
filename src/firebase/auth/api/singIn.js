import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Cookies } from "quasar";
import auth from "..";

const singIn = async ({ email, password }) => {
  try {
    const request = await signInWithEmailAndPassword(auth, email, password);
    const isVerified = request.user.emailVerified;

    if (!isVerified) {
      await signOut(auth);
      throw { message: "Your email isn't verified 🥸" };
    }
    Cookies.set("session", request.user, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    });
    return {
      message: `Welcome ${request.user.displayName} 😀`,
      user: request.user,
    };
  } catch (error) {
    throw error;
  }
};

export default singIn;
