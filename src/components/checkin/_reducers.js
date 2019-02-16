export default function checkinIsVisible(state = false, action) {
  switch (action.type) {
    case "SHOW_CHECKIN":
      return true;

    case "HIDE_CHECKIN":
      return false;

    default:
      return state;
  }
}
