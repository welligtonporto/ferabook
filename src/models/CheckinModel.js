import firebase from './../firebaseClient.js';
import firebaseAdmin from './../firebaseAdmin.js';

const userSignup = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

const userLogin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const userLogout = () => {
  return firebase.auth().signOut();
};

const adminLogin = (email, password) => {
  return firebaseAdmin.auth().signInWithEmailAndPassword(email, password);
};

const adminLogout = () => {
  return firebaseAdmin.auth().signOut();
};

export { userSignup, userLogin, userLogout, adminLogin, adminLogout };