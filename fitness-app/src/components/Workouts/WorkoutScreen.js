import React from "react";
import {View, Text} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import workoutStyles from "./workoutStyles";

export default function WorkoutScreen({navigation, route}){

    const workoutInfo = route.params;
    console.log(workoutInfo)
    console.log(workoutInfo.exercises)
    return (
    <ScrollView>
        {workoutInfo.exercises.map((x, i) => <Text style={workoutStyles.text} key={i}>{x}</Text>)}
    </ScrollView>
    )
}