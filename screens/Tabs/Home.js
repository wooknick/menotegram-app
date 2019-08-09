import React, { useState } from "react";
import { TouchableWithoutFeedback, ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../fragments";

export const FEED_QUERY = gql`
    {
        seeFeed {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const { loading, data, refetch } = useQuery(FEED_QUERY);
    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch({ fetchPolicy: "network-only" });
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    return (
        <TouchableWithoutFeedback>
            {loading ? (
                <Loader />
            ) : (
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
                    {data &&
                        data.seeFeed &&
                        data.seeFeed.map(post => <Post key={post.id} {...post} />)}
                </ScrollView>
            )}
        </TouchableWithoutFeedback>
    );
};
