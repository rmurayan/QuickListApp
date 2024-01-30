
import {initializeApp, getApps} from 'firebase/app';
import { getDatabase, ref }  from 'firebase/database';
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyB1Gggit9sRA9EAF58s-X1K4A4B41F5ylc",
  authDomain: "finalapp-f57da.firebaseapp.com",
  projectId: "finalapp-f57da",
  storageBucket: "finalapp-f57da.appspot.com",
  messagingSenderId: "621366101619",
  appId: "1:621366101619:web:8264a4c8ae12cf0a2dcc06",
  measurementId: "G-X21GMN7SE2"
};

var app;
if (!getApps().length){
  app = initializeApp(firebaseConfig); // If no app exists.
}
else{
  const APPS = getApps();
  app = APPS[0]; // Choose the first app from the array.
}

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const db = getDatabase(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);



const getUserId =()=>{
  return auth.currentUser.uid;
}

export const getCurrentUserInfo = ()=> {
    return auth.currentUser;
}

export const getList = (listName) => {
  let userID = getUserId();
  const Ref = ref(db, `/${listName}/` + userID);

  onValue(Ref, (snapshot) => {
    if (snapshot.exists()) {
        let data = JSON.parse(snapshot.val().list);
        console.log('data',data)
      
    } else {
      console.log("No data retrieved");
    }
  });
}

