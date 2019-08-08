import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
    const { loading, data } = useQuery(GET_USER, {
        variables: { username: navigation.getParam("username"), fetchPolicy: "network-only" }
    });
    return (
        <ScrollView>
            {loading ? <Loader /> : data && data.seeUser && <UserProfile {...data.seeUser} />}
        </ScrollView>
    );
};
