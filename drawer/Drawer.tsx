import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../views/home";
import SignUpForm from "../views/signup";
import Login from "../views/login";

const Drawer = createDrawerNavigator();

function MyDrawer() {

  return (
    <Drawer.Navigator initialRouteName={"Login"}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="SignUpForm"
        component={SignUpForm}
      />
       <Drawer.Screen
        name="Login"
        component={Login}
      />
    
    </Drawer.Navigator>
  );
}

export default MyDrawer;
