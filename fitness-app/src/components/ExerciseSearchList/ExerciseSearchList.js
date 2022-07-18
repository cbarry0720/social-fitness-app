import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";

export default function ExerciseSearchList({exercises, setExercise}){

    const onExercisePress = (exercise) => {
        return () => {
            setExercise(exercise)
        }
    }

    return (
        <ScrollView style={styles.container}>
            {exercises.map((x) => {
                return (
                    <TouchableOpacity key={x.Name} onPress={onExercisePress(x)}>
                        <Text style={styles.exercise}>{x.Name}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}