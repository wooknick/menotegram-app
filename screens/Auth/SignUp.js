import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const FBContainer = styled.View`
    margin-top: 25px;
    padding-top: 25px;
    border-top-width: 1px;
    border-top-color: ${props => props.theme.lightGreyColor};
    border-style: solid;
`;

const GoogleContainer = styled.View`
    margin-top: 20px;
`;

export default ({ navigation }) => {
    const fNameInput = useInput("");
    const lNameInput = useInput("");
    const usernameInput = useInput("");
    const emailInput = useInput(navigation.getParam("email", ""));
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            username: usernameInput.value,
            email: emailInput.value,
            firstName: fNameInput.value,
            lastName: lNameInput.value
        }
    });

    const handleSignUp = async () => {
        const { value: fName } = fNameInput;
        const { value: lName } = lNameInput;
        const { value: username } = usernameInput;
        const { value: email } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            return alert("That email is invalid");
        }
        if (fName === "") {
            return alert("I need your name");
        }
        if (username === "") {
            return alert("Invalid username");
        }
        try {
            setLoading(true);
            const {
                data: { createAccount }
            } = await createAccountMutation();
            if (createAccount) {
                alert("Account Created", "Login Now!");
                navigation.navigate("Login", { email });
            }
        } catch (e) {
            console.log(e);
            alert("Username Taken", "Login Instead");
            navigation.navigate("Login", { email });
        } finally {
            setLoading(false);
        }
    };

    const fbLogin = async () => {
        try {
            setLoading(true);
            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                "896546134053642",
                {
                    permissions: ["public_profile", "email"]
                }
            );
            if (type === "success") {
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
                );
                const { email, first_name: fName, last_name: lName } = await response.json();
                updateFormData(email, fName, lName);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        const GOOGLE_ID =
            "726308451273-f9gf520ars32j0d5r8pirae9ubsgslve.apps.googleusercontent.com";
        try {
            setLoading(true);
            const result = await Google.logInAsync({
                iosClientId: GOOGLE_ID,
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                    headers: { Authorization: `Bearer ${result.accessToken}` }
                });

                const { email, given_name: fName, family_name: lName } = await user.json();
                updateFormData(email, fName, lName);
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (email, firstName, lastName) => {
        emailInput.setValue(email);
        fNameInput.setValue(firstName);
        lNameInput.setValue(lastName);
        const [username] = email.split("@");
        usernameInput.setValue(username);
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...fNameInput}
                    placeholder="First Name"
                    autoCorrect={false}
                    autoCapitalize="words"
                />
                <AuthInput
                    {...lNameInput}
                    placeholder="Last Name"
                    autoCorrect={false}
                    autoCapitalize="words"
                />
                <AuthInput {...usernameInput} placeholder="Username" autoCorrect={false} />
                <AuthInput
                    {...emailInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="send"
                    autoCorrect={false}
                />
                <AuthButton loading={loading} onPress={handleSignUp} text="Sign Up" />
                <FBContainer>
                    <AuthButton
                        bgColor={"#2D4DA7"}
                        loading={false}
                        onPress={fbLogin}
                        text="Connect with Facebook"
                    />
                </FBContainer>
                <GoogleContainer>
                    <AuthButton
                        bgColor={"#EE1922"}
                        loading={false}
                        onPress={googleLogin}
                        text="Connect with Google"
                    />
                </GoogleContainer>
            </View>
        </TouchableWithoutFeedback>
    );
};
