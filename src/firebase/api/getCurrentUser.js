import { Cookies } from "quasar";
import auth from "../auth";

const getCurrentUser = () => {
  const user = Cookies.get("session");
  if (user === null) {
    return false;
  }

  return user;
};

export default getCurrentUser;
