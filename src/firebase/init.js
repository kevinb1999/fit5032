import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCTTrS79T4okDiwzH45v7gdSVPZ93fiFbY',
  authDomain: 'fit5032-lab-b27d3.firebaseapp.com',
  projectId: 'fit5032-lab-b27d3',
  storageBucket: 'fit5032-lab-b27d3.appspot.com',
  messagingSenderId: '14132429139',
  appId: '1:14132429139:web:947de12cf50fd57a41e1a6'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore()

export { auth, db }
