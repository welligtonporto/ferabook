import firebase from './../firebase.js';

const setOrder = (orderData) => {
  let key = firebase.database().ref().child('orders').push().key;

  let updates = {};
  updates[`/orders/${key}`] = orderData;
  updates[`/user_orders/${orderData.userId}/${key}`] = orderData;

  return firebase.database().ref().update(updates)
    .then(response => response.json())
    .catch(error => error);
};

const getUserOrders = (userId) => {
  return firebase.database().ref(`user_orders/${userId}`).once('value')
    .then(response => response.val())
    .catch(error => error);
};

const getOrders = () => {
  console.log('getOrders');
  return firebase.database().ref('orders').once('value')
    .then(response => response.val())
    .catch(error => error);
};

const updateOrder = (key, orderData) => {
  let updates = {};
  updates[`/orders/${key}`] = orderData;
  updates[`/user_orders/${orderData.userId}/${key}`] = orderData;

  return firebase.database().ref().update(updates);
};

export { setOrder, getUserOrders, getOrders, updateOrder };