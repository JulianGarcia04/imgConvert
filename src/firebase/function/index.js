import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import app from "..";

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

export default functions;
