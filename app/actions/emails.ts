'use server'

import { db } from "@/firebase";
import {  collection, getDocs } from 'firebase/firestore';

export async function GetReceiverEmails() {
    try {
        const emailsRef = collection(db, 'emails');
        const snapshot = await getDocs(emailsRef);
        const recipientEmails = snapshot.docs.map(doc => doc.data());
        
        return recipientEmails;
        
      } catch (error) {
        console.error('Error fetching emails:', error);
        return []
      }
}