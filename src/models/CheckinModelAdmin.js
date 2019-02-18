import firebaseAdmin from './../firebaseAdmin.js';

const login = (email, password) => {
  return firebaseAdmin.auth().signInWithEmailAndPassword(email, password);
};

const logout = () => {
  return firebaseAdmin.auth().signOut();
};

export { login, logout };