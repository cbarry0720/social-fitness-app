import React from 'react'
import { Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {Ionicons} from "react-native-vector-icons"
import { useState } from 'react';
import PostsFeed from '../../components/PostsFeed/PostsFeed';
import WorkoutsPage from '../../components/Workouts/WorkoutsPage';
import PRs from '../../components/PRs/PRs';
import ProgressPage from '../../components/ProgressPage/ProgressPage';

export default function ProfileScreen({navigation}) {

    const [menu, setMenu] = useState(0);

    const changeMenu = (x) =>{
        return function(){
            setMenu(x)
        }
    }

    const settingsClick = () => {
        alert("COMING SOON!")
    }

    const userInfo = {
        username: "cbarry0720",
        image: 'fitness-app/assets/profile.jpg',
        gym: "Bridgewater Fitness",
        bio: "I'm here to workout and post stuff",
        followers: ['user1', "user2", "user3"],
        following: ["user1", "user3"]
    }
    return (
        <ScrollView>
            <View>
                <Ionicons onPress={settingsClick} style={{alignSelf:"flex-end", paddingRight:10, paddingTop:10, fontSize:20}} name="settings"/>
            </View>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
                <Text style={{fontSize:24, padding:5}}>{userInfo.username}</Text>
            </View>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:28}}>{userInfo.followers.length}</Text>
                    <Text>{userInfo.followers.length == 1 ? "Follower" : "Followers"}</Text>
                </View>
                <View style={{alignItems:"center"}}>
                    <Image style={{width:75, height:75, borderRadius:"100%", padding:10}} source={require('../../../assets/profile.jpg')}/>
                    <Text>{userInfo.gym}</Text>
                    <Text>{userInfo.bio}</Text>
                </View>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:28}}>{userInfo.following.length}</Text>
                    <Text>Following</Text>
                </View>
            </View>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", marginTop:5, borderTopWidth:1, borderBottomWidth:1, padding:5}}>
                <Text style={menu != 0 ? {fontSize:22} : {fontSize:22, fontWeight:"bold"}} onPress={changeMenu(0)}>Posts</Text>
                <Text style={menu != 1 ? {fontSize:22} : {fontSize:22, fontWeight:"bold"}} onPress={changeMenu(1)}>Workouts</Text>
                <Text style={menu != 2 ? {fontSize:22} : {fontSize:22, fontWeight:"bold"}} onPress={changeMenu(2)}>PRs</Text>
                <Text style={menu != 3 ? {fontSize:22} : {fontSize:22, fontWeight:"bold"}} onPress={changeMenu(3)}>Progress</Text>
            </View>
            <View>
                {menu == 0 && <PostsFeed/>}
                {menu == 1 && <WorkoutsPage/>}
                {menu == 2 && <PRs/>}
                {menu == 3 && <ProgressPage/>}
            </View>
        </ScrollView>
    )
}