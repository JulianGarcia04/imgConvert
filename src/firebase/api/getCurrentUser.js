import { Cookies } from "quasar";

const getCurrentUser = () => {
  const user = Cookies.get("session");
  if (user === null) {
    return false;
  }

  return user;
};

export default getCurrentUser;
