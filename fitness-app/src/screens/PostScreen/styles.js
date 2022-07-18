import { StyleSheet } from "react-native";

export default new StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
    },
    startWorkout:{
        top:"45%",
    },
    startWorkoutButton:{
        fontSize:30
    },
    item:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"baseline",
        padding:5,
        marginBottom:10
    },
    right_side:{
        width:"50%",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    end_workout:{

    },
    timer:{
        alignSelf:"center",
        marginTop: 20,
        fontSize:28
    },
    pr:{
        borderRadius: 5,
        borderColor: "#BA9B00",
        color: "#BA9B00",
        borderWidth: 1,
        padding:5,
        paddingTop:2,
        paddingBottom:2
    },
    plus:{
        borderRadius:5,
        borderWidth:1,
        paddingLeft:6,
        paddingRight:6,
        paddingBottom:1,
        marginRight:20
    },
    exercise:{
        fontSize:18
    },
    exerciseInput:{
        backgroundColor: "#cccccc",
        marginLeft:5,
        marginRight:5,
        borderRadius:10,
        padding:10,
        fontSize:18
    },
    title:{
        alignSelf:"center",
        fontSize:24,
        fontWeight:"bold",
        padding:10
    },
    imagesContainer:{
        marginTop:10,
        flex:1,
        flexDirection: "row",
        flexWrap:"wrap",
        alignSelf:"center"
    },
    image:{
        width:125,
        height:125
    },
    imageContainer:{

    },
    remove:{
        position:"absolute",
        padding:2.5,
        borderWidth:1,
        borderColor:"black",
        color:"red",
        borderStyle:"solid",
        fontSize:20,
        left:98,
        backgroundColor:"white"
    }
});