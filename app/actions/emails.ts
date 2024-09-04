'use server'

import { db } from "@/firebase";
import {  collection, getDocs } from 'firebase/firestore';

export async function GetReceiverEmails() {
    try {
        const emailsCollectionRef = collection(db, 'emails');
        const querySnapshot = await getDocs(emailsCollectionRef);
      
        const recipientEmails: string[] = [];
        querySnapshot.forEach((doc) => {
          recipientEmails.push(doc.id); // Each document ID corresponds to a recipient email
        });
      
        return recipientEmails;
        
      } catch (error) {
        console.error('Error fetching emails:', error);
        return []
      }
}