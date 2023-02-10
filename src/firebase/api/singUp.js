import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import addUser from "./addUser";
import getUser from "./getUser";
import auth from "../auth";

const singUp = async ({ username, fullname, email, password }) => {
  try {
    const authRequest = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(authRequest.user, {
      displayName: username,
    });
    await sendEmailVerification(authRequest.user, {
      url: "http://192.168.1.3:9000/",
    });
    const dbRequest = await addUser(username, fullname, email);
    await signOut(auth);
    return {
      message: `Welcome ${username} to imgConvert, please check your email verication 😊`,
    };
  } catch (error) {
    throw error;
  }
};

export default singUp;
