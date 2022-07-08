
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        backgroundColor: "light-gray",
        borderRadius: 10,
        margin: 5,
        padding: 10,
        paddingBottom:10,
    },
    profilePic:{
        width:40, 
        height: 40, 
        marginBottom: 10,
        marginRight: 10,
        borderRadius:100
    },
    header:{
        flex:1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    image:{
        width:385,
        height: 385
    },
    caption:{
        marginTop: 5
    }
})