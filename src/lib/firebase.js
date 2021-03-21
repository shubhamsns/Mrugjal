import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from 'seed';

const config = {
  apiKey: 'AIzaSyCtqXNCatpHW8ceRCF1PR3QTfD4Ln-fr-w',
  authDomain: 'instagram-6dc96.firebaseapp.com',
  projectId: 'instagram-6dc96',
  storageBucket: 'instagram-6dc96.appspot.com',
  messagingSenderId: '559869003771',
  appId: '1:559869003771:web:c237c59e20c79c84f5ed5e',
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

// seedDatabase(firebaseApp);

const { FieldValue } = firebase.firestore;

export { firebaseApp, FieldValue };
