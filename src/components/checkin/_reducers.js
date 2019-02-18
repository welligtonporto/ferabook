export function checkinIsVisible(state = false, action) {
  switch (action.type) {
    case "SHOW_CHECKIN":
      return true;

    case "HIDE_CHECKIN":
      return false;

    default:
      return state;
  }
}

export function user(state = null, action) {
  switch (action.type) {
    case "SET_USER":
      return action.user;

    case "CLEAR_USER":
      return null;

    default:
      return state;
  }
}