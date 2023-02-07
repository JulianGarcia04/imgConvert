import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import addUser from "./addUser";
import getUser from "./getUser";
import auth from "../auth";

const singUp = async ({ username, fullname, email, password }) => {
  try {
    const isExits = await getUser(username);
    if (!isExits) {
      throw { message: "Este usuario ya exite" };
    }
    const authRequest = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(authRequest.user, {
      displayName: username,
    });
    const dbRequest = await addUser(username, fullname, email);
    return { message: `Welcome ${username} to imgConvert` };
  } catch (error) {
    throw error;
  }
};

export default singUp;
