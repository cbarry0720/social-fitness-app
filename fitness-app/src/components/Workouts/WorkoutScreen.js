import { collection, doc } from "firebase/firestore";
import React from "react";
import {View, Text} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import workoutStyles from "./workoutStyles";
import { auth, firestore } from "../../firebase/config";

export default function WorkoutScreen({navigation, route}){

    const workoutInfo = route.params;

    //JSX for Workout given workout info list
    return (
    <ScrollView>
        {workoutInfo.exercises.map((x, i) => <Text style={workoutStyles.text} key={i}>{x}</Text>)}
    </ScrollView>
    )
}