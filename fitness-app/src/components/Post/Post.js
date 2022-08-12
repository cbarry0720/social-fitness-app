import React, { useEffect, useState } from "react";
import styles from "./styles";
import { gym1, gym2, profile, timprofile } from "../../images";
import {View, Text, Image} from "react-native";
import { firestore, storage } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

//mock images
const imgMap = {
    gym1: gym1,
    gym2: gym2,
    profile: profile,
    timprofile: timprofile,
}

//calculate time since post
const getTimeDiff = function(time){
    let now = (new Date).getTime();
    let diff = Math.abs(now - (time.seconds * 1000))
    diff = diff / 1000
    if(diff < 60){
        return `${parseInt(diff)}s`
    }
    diff = diff / 60;
    if(diff < 60){
        return `${parseInt(diff)}m`
    }
    diff = diff / 60;
    if(diff < 24){
        return `${parseInt(diff)}h`
    }
    diff = diff / 24;
    return `${parseInt(diff)}d`

}
//JSX of a single post
export default function Post({data}){

    const [userData, setUserData] = useState({});
    const [images, setImages] = useState([])

    useEffect(() => {
        const docRef = doc(firestore, "users", data.userId)
        getDoc(docRef).then((x) => {
            let uData = x.data()
            getDownloadURL(ref(storage, uData.picture)).then( (x) => {
                let temp = Object.assign({}, uData);
                temp.picture = x;
                setUserData(temp)
            })
        }).then(() => {

        })
        getDownloadURL(ref(storage, data.images[0])).then( (x) => {
            setImages([x])
        })
    }, [data]);

    // data = data.item
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Image style={styles.profilePic} source={{uri: userData.picture}}/>
                    <View>
                        <Text style={{fontSize:20, fontWeight: "bold"}}>{userData.username}</Text>
                        <Text>{data.location}</Text>
                    </View>
                </View>
                <Text>{getTimeDiff(data.timePosted)}</Text>
            </View>
            <Image style={styles.image} source={{uri: images[0]}}/>
            <Text style={styles.caption}>{data.caption}</Text>
            {data.comments.length > 0 ? <Text>View Comments</Text> : <></>}
        </View>
    )
}