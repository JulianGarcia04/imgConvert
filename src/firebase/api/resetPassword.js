import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../auth";

const resetPassword = async (email) => {
  try {
    const request = await sendPasswordResetEmail(auth, email);
    return { message: "Your password was reseted, please check your email" };
  } catch (error) {
    throw { message: "Error to reset the password", code: error.code, error };
  }
};

export default resetPassword;
