// "use client";
// import { auth } from "../firebase/clientApp"; // Adjust the path according to your project structure
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useRouter } from 'next/router';

// // export const signInWithGoogle = async () => {
// //   const provider = new GoogleAuthProvider();
// //   try {
// //     const result = await signInWithPopup(auth, provider);
// //     // The sign-in was successful. You can access the signed-in user via result.user.
// //     // Firebase automatically handles the session, and the user is now either logged in or signed up.
// //     console.log("User signed in: ", result.user);
// //     auth.updateCurrentUser(result.user);
// //     // Here, you can redirect the user or perform other actions as needed.
// //   } catch (error) {
// //     console.error("Error signing in with Google: ", error);
// //     // Handle errors here, such as displaying an error message to the user.
// //   }
// // };

// // export const signInWithGoogle = async (onSuccess:any, onError:any) => {
// //     const provider = new GoogleAuthProvider();
// //     try {
// //       const result = await signInWithPopup(auth, provider);
// //       console.log("User signed in: ", result.user);
  
// //       // Call onSuccess callback function after successful sign-in
// //       if (onSuccess) onSuccess(result.user);
// //     } catch (error) {
// //       console.error("Error signing in with Google: ", error);
// //       // Call onError callback function if an error occurred
// //       if (onError) onError(error);
// //     }
// //   };

// export const signInWithGoogle = async (onSuccess: any, onError: any) => {
//     const router = useRouter(); // Instantiate the router object
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       console.log("User signed in: ", result.user);
  
//       // Call onSuccess callback function after successful sign-in
//       if (onSuccess) onSuccess(result.user);

//       // Redirect user to the home page after successful login
//       router.push('/');

//     } catch (error) {
//       console.error("Error signing in with Google: ", error);
//       // Call onError callback function if an error occurred
//       if (onError) onError(error);
//     }
// };

// Adjust the path according to your project structure
import { auth } from "../firebase/clientApp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async (router:any, onSuccess:any, onError:any) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in: ", result.user);
  
      // Call onSuccess callback function after successful sign-in
      if (onSuccess) onSuccess(result.user);

      // Redirect user to the desired page after successful login
      router.push('/'); // Adjusted to '/dashboard' based on your initial request

    } catch (error) {
      console.error("Error signing in with Google: ", error);
      // Call onError callback function if an error occurred
      if (onError) onError(error);
    }
};
