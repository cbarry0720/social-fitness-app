import React from "react";
import styles from "./styles";
import { gym1, gym2, profile, timprofile } from "../../images";
import {View, Text, Image} from "react-native";

const imgMap = {
    gym1: gym1,
    gym2: gym2,
    profile: profile,
    timprofile: timprofile,
}

const getTimeDiff = function(time){
    let now = (new Date).getTime();
    let diff = Math.abs(now - time.getTime())
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

export default function Post({data}){
    // data = data.item
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Image style={styles.profilePic} source={imgMap[data.pfp]}/>
                    <View>
                        <Text style={{fontSize:20, fontWeight: "bold"}}>{data.username}</Text>
                        <Text>{data.location}</Text>
                    </View>
                </View>
                <Text>{getTimeDiff(data.timePosted)}</Text>
            </View>
            <Image style={styles.image} source={imgMap[data.images[0]]}/>
            <Text style={styles.caption}>{data.caption}</Text>
            {data.comments.length > 0 ? <Text>View Comments</Text> : <></>}
        </View>
    )
}