// import firebaseConfig from "@/firebase/clientApp";
// import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

// const auth = getAuth(firebaseConfig);

// export default async function signIn(email : string, password : string) {
//     let result = null,
//         error = null;
//     try {
//         result = await signInWithEmailAndPassword(auth, email, password);
//     } catch (e) {
//         error = e;
//     }

//     return { result, error };
// }


// Adjust the import if using Firebase v9 or newer, as shown below:
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../clientApp"; // Make sure this path is correct

export async function signIn(email: string, password: string) {
    let result = null;
    let error: FirebaseError | null = null; // Use FirebaseError for better error handling
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        if (e instanceof FirebaseError) {
            error = e;
        } else {
            // Handle non-Firebase errors if necessary
            console.error("An unexpected error occurred", e);
        }
    }

    return { result, error };
}
