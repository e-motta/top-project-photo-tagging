import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyAs0DKIDTOvItk5kZrCdOEWT2kgwgKFl3c',
  authDomain: 'top-project-photo-tagging.firebaseapp.com',
  projectId: 'top-project-photo-tagging',
  storageBucket: 'top-project-photo-tagging.appspot.com',
  messagingSenderId: '704820916168',
  appId: '1:704820916168:web:4d4658929c32549ce45afd',
  measurementId: 'G-B2S5CCM381',
});

export const firestore = getFirestore(app);
