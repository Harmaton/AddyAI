'use server'

import { db } from "@/firebase";
import {  collection, doc, getDoc, getDocs } from 'firebase/firestore';

export async function GetReceiverEmails() {
    try {
        const emailsCollectionRef = collection(db, 'emails');
        const querySnapshot = await getDocs(emailsCollectionRef);
      
        const recipientEmails: string[] = [];
        querySnapshot.forEach((doc) => {
          recipientEmails.push(doc.id); 
        });
      
        return recipientEmails;
        
      } catch (error) {
        console.error('Error fetching emails:', error);
        return []
      }
}

export async function GetMessagesForEmail(recipientEmail: string) {
    try {
      const decodedEmail = decodeURIComponent(recipientEmail);
      const emailsCollectionRef = collection(db, 'emails');
      const querySnapshot = await getDocs(emailsCollectionRef);
      
      for (const doc of querySnapshot.docs) {
        if (doc.id === decodedEmail) {
          const emailData = doc.data();
          console.log(`Found document for email: ${decodedEmail}`);
          return { success: true, messages: emailData.messages || [] };
        }
      }
      
      console.log(`No document found for email: ${decodedEmail}`);
      return { success: false, error: "Email not found" };
      
    } catch (error) {
      console.error('Error fetching messages for email:', error);
      return { success: false, error: "Failed to fetch messages" };
    }
  }