import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

//Firebase project configuration (google-sign-in-flow);
const firebaseConfig = {
  apiKey: "AIzaSyAOddGsogyhTPV57ENwZaQeJ2j2pKF1inM",
  authDomain: "signin-flow-b8e31.firebaseapp.com",
  projectId: "signin-flow-b8e31",
  storageBucket: "signin-flow-b8e31.appspot.com",
  messagingSenderId: "573632564839",
  appId: "1:573632564839:web:0adc20d16433928842cec2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// Google cloud services
//IOS Client id: 956198339505-25itce7d2n0fmhcqv9s540obeqr75dim.apps.googleusercontent.com
//Android Client id: 956198339505-7g5bm1jt4vvd714f9921nc809llpvd2o.apps.googleusercontent.com