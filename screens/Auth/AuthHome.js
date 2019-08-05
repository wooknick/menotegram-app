import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Image = styled.Image`
    width: ${constants.width / 2};
    height: ${constants.height / 6};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
    color: ${props => props.theme.blueColor};
    margin-top: 20px;
    font-weight: 600;
`;

export default ({ navigation }) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <AuthButton text={"Create New Account"} onPress={() => navigation.navigate("SignUp")} />
        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Login</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);
