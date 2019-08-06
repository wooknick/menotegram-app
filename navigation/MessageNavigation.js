import { createStackNavigator } from "react-navigation";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";
import { stackStyles } from "./config";

export default createStackNavigator(
    {
        Message,
        Messages
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                ...stackStyles
            }
        }
    }
);
