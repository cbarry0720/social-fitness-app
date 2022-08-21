import React, { useEffect, useState } from "react";
import {View, Text} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Post from "../Post/Post";
import { auth, firestore, storage } from "../../firebase/config";
import {collection, query, where, orderBy, getDocs, getDoc, doc} from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage";

//mock post data
let postings = [
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



export default function PostsFeed({profilePage, userId}){

    const [posts, setPosts] = useState([]);
    let userData = {}

    const loadFollowers = async () => {
        if(!profilePage){
            const docRef = doc(firestore, "users", auth.currentUser.uid)
            getDoc(docRef).then((x) => {
                userData = x.data()
                loadPosts()
            })
        }else{
            loadPosts()
        }
    }

    const loadPosts = async () => {
        const q = profilePage ? query(collection(firestore, "posts"), where("userId", "==", userId), orderBy("time", "desc")) : query(collection(firestore, "posts"), where("userId", "in", userData.following), orderBy("time", "desc"))
        getDocs(q).then((x) => {
            let tempPosts = []
            x.forEach((x) => {
                tempPosts.push(x.data())
            })
            setPosts(tempPosts);
        })
    }
    useEffect(() => {loadFollowers()}, [userId]);

    const reformatPostData = (data, id) => {
        return {
            id:id,
            userId: data.userId, //TODO: Change Post.js from username, pfp to userId
            location: data.location,
            images: [data.images[0]],
            workout: data.exercises,
            caption: data.caption,
            comments: data.comments,
            timePosted: data.time
        }
    }

    //JSX of feed of posts
    return (
    <ScrollView scrollEnabled={true}>
        {posts.map((x, i) => <Post key={i} data={reformatPostData(x, i)}/>)}
    </ScrollView>

    // <View>
    //     <FlatList style={{height:"100%"}} data={posts} keyExtractor={x => x.id} renderItem = { x => <Post data={x} />}/>
    // </View>
)}