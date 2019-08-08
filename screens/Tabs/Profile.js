import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const LoaderContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ME = gql`
    {
        me {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default () => {
    const { loading, data } = useQuery(ME, { fetchPolicy: "network-only" });

    return (
        <View>
            {loading ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <ScrollView>{data && data.me && <UserProfile {...data.me} />}</ScrollView>
            )}
        </View>
    );
};
