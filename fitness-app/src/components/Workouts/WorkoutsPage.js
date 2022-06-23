import { useNavigation } from "@react-navigation/native";
import React from "react";
import styles from "./styles";
import {View, Text, TouchableOpacity} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import WorkoutScreen from "./WorkoutScreen";

const workoutList = [
    {
        name:"My Push Day",
        exercises:["Bench Press", "Incline Dumbbell Press", "Seated Dumbbell Press", "Lateral Raises"]
    },
    {
        name:"My Pull Day",
        exercises:["Pull Ups", "Lat Pulldown", "Rows", "Single Arm Pulldown"]
    },
    {
        name:"My Leg Day",
        exercises:["Barbell Squats", "Goblet Squats", "Hamstring Curls", "Calf Raises"]
    },
    {
        name:"My Arms Day",
        exercises:["Curls", "More Curls", "Even More Curls", "Tricep Extensions Too"]
    }
]

export default function WorkoutsPage(){

    const navigation = useNavigation()

    const clickWorkout = (x) => {
        return () => {
            navigation.navigate("My Workout", x)
        }
    }

    return (<View>
        <ScrollView style={styles.container}>
            {workoutList.map((x, i) => (
                <TouchableOpacity key={i} onPress={clickWorkout(x)} style={styles.item_container}>
                {/* <TouchableOpacity onPress={navigation.navigate("My Workout", x)}> */}
                    <Text style={{fontSize:20}}>{x.name}</Text>
                    <Text style={{fontSize:18, color:"#bbbbbb"}}>{">"}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>)
}