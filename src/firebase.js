import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC5gFnBlI1VZYjr25E31ns0zNBSyUkHZpI",
  authDomain: "book-store-78296.firebaseapp.com",
  projectId: "book-store-78296",
  storageBucket: "book-store-78296.appspot.com",
  messagingSenderId: "193355795758",
  appId: "1:193355795758:web:7b4ec9dbf72b414d697ebf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
// export default app