import { useNavigation } from "@react-navigation/native";
import { firestore, auth } from "../../firebase/config";
import {React, useState, useEffect} from "react";
import styles from "./styles";
import { collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import {View, Text, TouchableOpacity} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import WorkoutScreen from "./WorkoutScreen";


export default function WorkoutsPage(){

    const navigation = useNavigation();

    const [workouts, setWorkouts] = useState([]);

    //on workout button press
    const clickWorkout = (x) => {
        return () => {
            navigation.navigate("My Workout", x)
        }
    }

    const getWorkoutData = () => {
        const q = query(collection(firestore, "workouts"), where("uid", "==", auth.currentUser.uid));
        getDocs(q).then((x) => {
            let tempWorkouts = []
            x.forEach(workout => {
                tempWorkouts.push(workout.data())
            })
            setWorkouts(tempWorkouts)
        })
    }

    //get workout data on load
    useEffect(() => {
        getWorkoutData();
    }, [])
    

    //JSX for List of Workouts withing Profile Page
    return (
    <View>
        <ScrollView style={styles.container}>
            {workouts.map((x, i) => (
                <TouchableOpacity key={i} onPress={clickWorkout(x)} style={styles.item_container}>
                {/* <TouchableOpacity onPress={navigation.navigate("My Workout", x)}> */}
                    <Text style={{fontSize:20}}>{x.name}</Text>
                    <Text style={{fontSize:18, color:"#bbbbbb"}}>{">"}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>)
}