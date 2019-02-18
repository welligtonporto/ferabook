export function userAdmin(state = null, action) {
  switch (action.type) {
    case "SET_USER_ADMIN":
      return action.user;

    case "CLEAR_USER_ADMIN":
      return null;

    default:
      return state;
  }
}