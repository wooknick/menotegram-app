import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";

export default () => {
    const isLoggedIn = useIsLoggedIn();
    const login = useLogIn();
    const logout = useLogOut();
    return (
        <View style={{ flex: "1", justifyContent: "center", alignItems: "center" }}>
            {isLoggedIn ? (
                <TouchableOpacity onPress={logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={login}>
                    <Text>Login</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
