import React, { useEffect } from 'react'
import { Text, View, Image, Platform, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {Ionicons} from "react-native-vector-icons"
import { useState } from 'react';
import PostsFeed from '../../components/PostsFeed/PostsFeed';
import WorkoutsPage from '../../components/Workouts/WorkoutsPage';
import PRs from '../../components/PRs/PRs';
import ProgressPage from '../../components/ProgressPage/ProgressPage';
import * as ImagePicker from 'expo-image-picker';
import firebase, { auth, firestore, storage } from '../../firebase/config'
import styles from './styles';
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

export default function ProfileScreen({route, navigation}) {

    const [menu, setMenu] = useState(0);
    const [image, setImage] = useState("");
    const [userInfo, setUserInfo] = useState({
        email: "",
        username: "",
        picture: "",
        bio: "",
        followers: [],
        following: [],
        id: 0,
        fullName: ""
    });

    const userData = route && route.params ? route.params.userDataParam : undefined;

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

        // uploadImage = async (uri, imageName) => {
        //     const response = await fetch(uri);
        //     const blob = await response.blob();
        
        //     let ref = firebase.storage().ref().child("images/" + imageName);
        //     return ref.put(blob);
        //   }
        
      };
      useEffect( () => {
        let tempUserInfo = {}
        if(!userData){
            getDoc(doc(firestore, "users", auth.currentUser.uid)).then((x) => {
                tempUserInfo = x.data()
                setUserInfo(x.data())
            }).then(() => {
                getDownloadURL(ref(storage, tempUserInfo.picture)).then((x) => {
                    setImage(x)
                })
            }
            ).catch((error) => {
                console.log(error)
            })
        }else{
            tempUserInfo = userData
            setUserInfo(userData)
            getDownloadURL(ref(storage, tempUserInfo.picture)).then((x) => {
                setImage(x)
            }).catch((error) => {
                console.log(error)
            })
        }
      }, [])

    ///Ibe testing stuff end 

    const follow = () => {
        const ref = doc(firestore, "users", userInfo.id);
        updateDoc(ref, {followers: arrayUnion(auth.currentUser.uid)}).then(() => {
            updateDoc(doc(firestore, "users", auth.currentUser.uid), {following: arrayUnion(userInfo.id)});
        }).then(() => {
            setUserInfo({...userInfo, followers: [...userInfo.followers, auth.currentUser.uid]});
        }).catch((error) => {
            console.log(error)
        })
    }

    const unfollow = () => {
        const ref = doc(firestore, "users", userInfo.id);
        updateDoc(ref, {followers: userInfo.followers.filter((x) => x !== auth.currentUser.uid)}).then(() => {
            updateDoc(doc(firestore, "users", auth.currentUser.uid), {following: userInfo.following.filter((x) => x !== userInfo.id)});
        }).then(() => {
            setUserInfo({...userInfo, followers: userInfo.followers.filter((x) => x !== auth.currentUser.uid)});
        }).catch((error) => {
            console.log(error)
        })
    }

    //JSX for profile page
    return (
        <ScrollView>
            {/* {
                userData != undefined ?
                (<></>) :
                (<View style={styles.header}>
                    <View>
                        <Ionicons onPress={newPost} style={styles.add} name="add"/>
                    </View>
                    <View>
                        <Ionicons onPress={settingsClick} style={styles.settings} name="settings"/>
                    </View>      
                </View>
            )} */}
            <View style={styles.info}>
                <Text style={styles.username}>{userInfo.username}</Text>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem}>
                    <Text style={styles.followers}>{userInfo.followers.length}</Text>
                    <Text>{userInfo.followers.length == 1 ? "Follower" : "Followers"}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Image style={styles.pfp} source={{uri: image}}/>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                        {
                            userInfo.id == auth.currentUser.uid ? 
                            (<TouchableOpacity>
                                <Text style={styles.edit}>Edit Profile</Text>
                            </TouchableOpacity>) : 
                            (userInfo.followers.includes(auth.currentUser.uid) ? 
                            (<TouchableOpacity onPress={unfollow}>
                                <Text>Unfollow</Text>
                            </TouchableOpacity>) : 
                            (<TouchableOpacity onPress={follow}>
                                <Text>Follow</Text>
                            </TouchableOpacity>))
                        }
                    </TouchableOpacity>
                    <Text>{userInfo.bio ? userInfo.bio : ""}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.following}>{userInfo.following.length}</Text>
                    <Text>Following</Text>
                </View>
            </View>
            <View style={Platform.OS == "ios" ? styles.menuIOS : styles.menuWeb}>
                <Text style={menu != 0 ? styles.menuText : styles.menuTextBold} onPress={changeMenu(0)}>Posts</Text>
                <Text style={menu != 1 ? styles.menuText : styles.menuTextBold} onPress={changeMenu(1)}>Workouts</Text>
                <Text style={menu != 2 ? styles.menuText : styles.menuTextBold} onPress={changeMenu(2)}>PRs</Text>
                <Text style={menu != 3 ? styles.menuText : styles.menuTextBold} onPress={changeMenu(3)}>Progress</Text>
            </View>
            <View>
                {menu == 0 && (userInfo.id != 0 ? (<PostsFeed profilePage={true} userId = {userInfo.id}/>) : (<></>))}
                {menu == 1 && <WorkoutsPage/>}
                {menu == 2 && <PRs/>}
                {menu == 3 && <ProgressPage/>}
            </View>
        </ScrollView>
    )
}