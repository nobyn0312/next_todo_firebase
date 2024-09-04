import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";


interface Post {
  title: string;
  content: string;
  createdAt: Date;
}


export const AddPost =()=>{

}