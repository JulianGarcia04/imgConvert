import { signOut } from "firebase/auth";
import auth from "../auth";

const SignOut = async () => {
  try {
    const request = await signOut(auth);
    return { message: "Good Bye 😉" };
  } catch (error) {
    throw { message: "server error 😖" };
  }
};

export default SignOut;
