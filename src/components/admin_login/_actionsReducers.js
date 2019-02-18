export function setUserAdmin(user) {
  return {
    type: "SET_USER_ADMIN",
    user
  };
}

export function clearUserAdmin() {
  return {
    type: "CLEAR_USER_ADMIN"
  };
}