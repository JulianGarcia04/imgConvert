import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import app from "..";

const functions = getFunctions(app);
if (process.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export default functions;
