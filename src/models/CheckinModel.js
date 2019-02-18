import firebase from './../firebase.js';

const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const logout = () => {
  return firebase.auth().signOut();
};

export { signUp, login, logout };