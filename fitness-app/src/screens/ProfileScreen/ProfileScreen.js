import React, { useEffect } from 'react'
import { Text, View, Image, Platform} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {Ionicons} from "react-native-vector-icons"
import { useState } from 'react';
import PostsFeed from '../../components/PostsFeed/PostsFeed';
import WorkoutsPage from '../../components/Workouts/WorkoutsPage';
import PRs from '../../components/PRs/PRs';
import ProgressPage from '../../components/ProgressPage/ProgressPage';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../firebase/config'

export default function ProfileScreen({navigation, userData}) {

    const [menu, setMenu] = useState(0);

    const changeMenu = (x) =>{
        return function(){
            setMenu(x)
        }
    }

    const settingsClick = () => {
        alert("COMING SOON!")
    }

    ///Ibe testing stuff

    const newPost = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            //still need to determine how to connect uploaded image to firebase - ibe
            // uploadImage(result.uri, "test-image")
            //   .then(() => {
            //     Alert.alert("Success");
            //   })
            //   .catch((error) => {
            //     Alert.alert(error);
            //   });
            alert("Image selected - firebase implementation coming soon");
        }

        uploadImage = async (uri, imageName) => {
            const response = await fetch(uri);
            const blob = await response.blob();
        
            let ref = firebase.storage().ref().child("images/" + imageName);
            return ref.put(blob);
          }
        
      };


    ///Ibe testing stuff end 



    //mock user info
    const userInfo = {
        username: "cbarry0720",
        image: 'fitness-app/assets/profile.jpg',
        gym: "Bridgewater Fitness",
        bio: "I'm here to workout and post stuff",
        followers: ['user1', "user2", "user3"],
        following: ["user1", "user3"]
    }

    //JSX for profile page
    return (
        <ScrollView>
            {
                userData ?
                (<></>) :
                (<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Ionicons onPress={newPost} style={{alignSelf:"flex-start", paddingTop:10, fontSize:30}} name="add"/>
                    </View>
                    <View>
                        <Ionicons onPress={settingsClick} style={{alignSelf:"flex-end", paddingRight:10, paddingTop:10, fontSize:20}} name="settings"/>
                    </View>      
                </View>
            )}
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
                <Text style={{fontSize:24, padding:5}}>{userInfo.username}</Text>
            </View>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:28}}>{userInfo.followers.length}</Text>
                    <Text>{userInfo.followers.length == 1 ? "Follower" : "Followers"}</Text>
                </View>
                <View style={{alignItems:"center"}}>
                    <Image style={{width:75, height:75, borderRadius:100, padding:10}} source={require('../../../assets/profile.jpg')}/>
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
                {menu == 0 && <PostsFeed profilePage={true}/>}
                {menu == 1 && <WorkoutsPage/>}
                {menu == 2 && <PRs/>}
                {menu == 3 && <ProgressPage/>}
            </View>
        </ScrollView>
    )
}