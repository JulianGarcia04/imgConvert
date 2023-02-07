import { signInWithEmailAndPassword } from "firebase/auth";
import { Cookies } from "quasar";
import auth from "../auth";

const singIn = async ({ email, password }) => {
  try {
    const request = await signInWithEmailAndPassword(auth, email, password);
    Cookies.set("session", request.user, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    });
    return {
      message: `Welcome ${request.user.displayName}`,
      user: request.user,
    };
  } catch (error) {
    throw { message: "The data is bad" };
  }
};

export default singIn;
