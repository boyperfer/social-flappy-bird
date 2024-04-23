import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA278ukT86ldLvSm-A6DZ5RKKX3DyNHzQM",
    authDomain: "game-demo-f4203.firebaseapp.com",
    projectId: "game-demo-f4203",
    storageBucket: "game-demo-f4203.appspot.com",
    messagingSenderId: "452776487123",
    appId: "1:452776487123:web:3d81706b3e668a9c8d8c26",
    measurementId: "G-VTYE4M36DY",
};

const app = initializeApp(firebaseConfig);

const googlePovider = new GoogleAuthProvider();

googlePovider.setCustomParameters({
    prompt: "select_account",
});
// Initialize Firebase
export const auth = getAuth();

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    addintionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocumentReference = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocumentReference);
    console.log("user auth: " + userAuth);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const score = 0;
        console.log("user auth: ", userAuth);
        const createdAt = new Date();
        try {
            await setDoc(userDocumentReference, {
                displayName,
                email,
                createdAt,
                score,
                ...addintionalInformation,
            });
        } catch (error) {
            console.log("error creating a user" + error.message);
        }
    }

    return userSnapshot;
};

export const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = querySnapshot.docs.map((doc) => doc.data());
    return userList;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};
