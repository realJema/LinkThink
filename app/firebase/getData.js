import firebase_app from "./config";
import { getFirestore, collection, getDoc, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDoument(colName) {
    let docRef = collection(db, colName);

    let result = null;
    let newData = null; 
    let error = null;

    try {
        result = await getDocs(docRef);
    } catch (e) {
        error = e;
    }

    await getDocs(docRef)
    .then((querySnapshot)=>{               
        newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id })); 
    })


    return { newData, error };
}