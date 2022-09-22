import { limit, collection, query, where, getDocs } from 'firebase/firestore'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {FontAwesome5} from "react-native-vector-icons"
import styles from './styles'
import { firestore, storage } from '../../firebase/config'
import { getDownloadURL, ref } from 'firebase/storage'

export default function SearchScreen({navigation}) {

    const [users, setUsers] = useState([])
    const [image, setImage] = useState("")

    const searchUsers = (text) => {
        if(text.length < 3){
            return
        }
        const q = query(collection(firestore, "users"), where("username", "==", text.toLowerCase()), limit(25))
        let tempUsers = [];
        getDocs(q).then((x) => {
            x.forEach((x) => {
                tempUsers.push(x.data())
            })
            setUsers(tempUsers);
        }).then(()=> {
            if(tempUsers.length == 0){
                return
            }
            getDownloadURL(ref(storage, tempUsers[0].picture)).then( (x) => {
                setImage(x)
            })
        })
    }

    const openUser = (userData) => {
        return () => {
            navigation.push("Profile", {userDataParam: userData})
        }
    }

    //JSX for search
    return (
        <View>
            <TextInput onChangeText={searchUsers} autoFocus={true} returnKeyType="search" keyboardType="web-search" clearButtonMode="always" style={styles.bar} placeholder="Search"/>
            {users.map((x, i) => {
                return (
                    <TouchableOpacity onPress={openUser(x)} key={i} on style={styles.user}>
                        <Image style={styles.pfp} source={{uri: image}} />
                        <Text style={styles.userText}>{x.username}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}