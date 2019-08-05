import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOGIN } from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({ navigation }) => {
    const emailInput = useInput(navigation.getParam("email", ""));
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOGIN, {
        variables: {
            email: emailInput.value
        }
    });
    const handleLogin = async () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === "") {
            return alert("Email can't be empty");
        } else if (!value.includes("@") || !value.includes(".")) {
            return alert("Please write an email");
        } else if (!emailRegex.test(value)) {
            return alert("That email is invalid");
        }
        try {
            setLoading(true);
            const {
                data: { requestSecret }
            } = await requestSecretMutation();
            if (requestSecret) {
                alert("Check your email");
                navigation.navigate("Confirm", { email: value });
                return;
            } else {
                alert("Account not found");
                navigation.navigate("SignUp", { email: value });
            }
        } catch (e) {
            console.log(e);
            alert("Can't login now");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...emailInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="send"
                    onSubmitEditing={handleLogin}
                    autoCorrect={false}
                />
                <AuthButton loading={loading} onPress={handleLogin} text="Login" />
            </View>
        </TouchableWithoutFeedback>
    );
};
