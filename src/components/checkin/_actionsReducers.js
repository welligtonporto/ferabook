export function showCheckin() {
  return {
    type: "SHOW_CHECKIN"
  };
}

export function hideCheckin() {
  return {
    type: "HIDE_CHECKIN"
  };
}

export function setUser(user) {
  return {
    type: "SET_USER",
    user
  };
}

export function clearUser() {
  return {
    type: "CLEAR_USER"
  };
}