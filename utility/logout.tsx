import auth from "@react-native-firebase/auth";

export function Logout() {
  auth()
    .signOut()
    .then(() => console.log("User signed out!"));

  return null;
}

export default Logout;