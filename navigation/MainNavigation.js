import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator(
    {
        TabNavigation,
        PhotoNavigation,
        MessageNavigation
    },
    {
        headerMode: "none",
        mode: "modal",
        defaultNavigationOptions: {
            headerStyle: { ...stackStyles }
        }
    }
);

export default createAppContainer(MainNavigation);
