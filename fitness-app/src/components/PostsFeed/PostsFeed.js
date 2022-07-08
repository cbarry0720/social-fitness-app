import React from "react";
import {View, Text} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Post from "../Post/Post";

//mock post data
const posts = [
    {
        id:1,
        username:"cbarry0720",
        pfp: 'profile',
        location:"bfit",
        images: ["gym1"],
        workout: ["Bench Press", "Shoulder Press"],
        caption: "I love working out",
        comments: [],
        timePosted: new Date(2022, 6, 21, 15, 15)
    },
    {
        id:2,
        username:"tim",
        pfp: "timprofile",
        location:"Bridgewater Fitness",
        images: ["gym1", "gym2"],
        workout: ["Squats", "Calf Raises"],
        caption: "bfit is awesome",
        comments: [],
        timePosted: new Date(2022, 6, 21, 15, 15)
    },
    {
        id:3,
        username:"cbarry0720",
        pfp: 'profile',
        location:"bfit",
        images: ["gym2"],
        workout: ["Pull Ups", "Rows"],
        caption: "the Y sucks",
        comments: [{userId: 1, comment: "HELLO"}, {userId: 0, comment: "HI"}],
        timePosted: new Date(2022, 6, 21, 15, 15)
    }
]

export default function PostsFeed(){

    //JSX of feed of posts
    return (
    <ScrollView scrollEnabled={true}>
        {posts.map((x, i) => <Post key={i} data={x}/>)}
    </ScrollView>

    // <View>
    //     <FlatList style={{height:"100%"}} data={posts} keyExtractor={x => x.id} renderItem = { x => <Post data={x} />}/>
    // </View>
)}