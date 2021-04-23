import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/firestore'
// import 'firebase/analytics';

var firebaseConfig = {
	apiKey: 'AIzaSyCgGJTjxPr_zlX2pFVdIy0i0CpPy6rWnGY',
	authDomain: 'notes-firebase-6f649.firebaseapp.com',
	projectId: 'notes-firebase-6f649',
	storageBucket: 'notes-firebase-6f649.appspot.com',
	messagingSenderId: '772548935564',
	appId: '1:772548935564:web:0e9ab5ca742b7df08960a9',
	measurementId: 'G-G710YQT2DZ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
