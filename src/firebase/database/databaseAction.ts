// import { db } from "@/firebase/clientApp"; 

// // Function to fetch data from Realtime Database
// const fetchDataFromRealtimeDB = async (nodePath: string) => {
//   try {
//     // Fetch data from the specified node path in the database
//     const snapshot = await db.ref(nodePath).once('value');
//     const data = snapshot.val();
//     console.log('Fetched data:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// }

// // Function to save data to Realtime Database
// const saveDataToRealtimeDB = async (nodePath: string, newData: any) => {
//   try {
//     // Set the new data at the specified node path in the database
//     await db.ref(nodePath).set(newData);
//     console.log('Data saved successfully!');
//     return true;
//   } catch (error) {
//     console.error('Error saving data:', error);
//     return false;
//   }
// }

// export { fetchDataFromRealtimeDB, saveDataToRealtimeDB };