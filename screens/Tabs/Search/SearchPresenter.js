import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";

export const SEARCH = gql`
    query search($term: String!) {
        searchPost(term: $term) {
            id
            files {
                id
                url
            }
            likeCount
            commentCount
        }
    }
`;

const View = styled.View`
    flex: 1;
    flex-direction: row;
`;

const Text = styled.Text``;

const SearchPresenter = ({ term, shouldFetch }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEARCH, {
        variables: {
            term
        },
        skip: !shouldFetch,
        fetchPolicy: "network-only"
    });
    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await refetch({ variables: { term } });
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {loading ? (
                <Loader />
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View>
                        {data &&
                            data.searchPost &&
                            data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)}
                    </View>
                </ScrollView>
            )}
        </TouchableWithoutFeedback>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
