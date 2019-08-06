import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from "../screens/Auth/SignUp";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
    { AuthHome, SignUp, Confirm, Login },
    {
        initialRouteName: "AuthHome",
        headerMode: "none"
    }
);

export default createAppContainer(AuthNavigation);
