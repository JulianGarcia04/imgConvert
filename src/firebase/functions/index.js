import app from "..";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

export default functions;
