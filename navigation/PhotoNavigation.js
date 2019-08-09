import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator(
    {
        Take: {
            screen: TakePhoto,
            navigationOptions: {
                tabBarLabel: "Take",
                header: null
            }
        },
        Select: {
            screen: SelectPhoto,
            navigationOptions: {
                tabBarLabel: "Select"
            }
        }
    },
    {
        tabBarPosition: "bottom",
        tabBarOptions: {
            indicatorStyle: {
                backgroundColor: "rgba(0, 0, 0, 0)"
            },
            labelStyle: {
                color: styles.blackColor,
                fontWeight: "600"
            },
            style: {
                paddingBottom: 20,
                ...stackStyles
            }
        }
    }
);

export default createStackNavigator(
    {
        Tabs: {
            screen: PhotoTabs,
            navigationOptions: {
                title: "Choose Photo",
                headerBackTitle: null
            }
        },
        Upload: {
            screen: UploadPhoto,
            navigationOptions: {
                title: "Upload"
            }
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: { ...stackStyles },
            headerTintColor: styles.blackColor
        }
    }
);
