import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import app from "..";

const db = getFirestore(app);

if (process.env.DEV) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

export default db;
