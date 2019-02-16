import firebase from './../firebase.js';

const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export { signUp };