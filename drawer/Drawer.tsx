import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../views/home";
import Logout from "../utility/logout";
import UserProfile from "../views/userProfile";

const Drawer = createDrawerNavigator();

function MyDrawer({ userInfo }) {
  const serializedUserInfo = {
    email: userInfo.email,
  };

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="User"
        component={UserProfile}
        initialParams={{ userInfo: serializedUserInfo }}
        options={{ drawerLabel: "User Profile" }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ drawerLabel: "Logout" }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
