import React, { useState } from 'react'
import { Text, View, Button, TouchableOpacity} from 'react-native'
import styles from './styles';
import { ActionSheetIOS } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function PostScreen({navigation}) {


    const [template, setTemplate] = useState(0);
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
    workoutList.unshift({name:"New Workout", exercises: []})

    const openMenu = function(){
        let options = workoutList.map(x => x.name)
        options.unshift("Cancel")
        ActionSheetIOS.showActionSheetWithOptions(
            {
              options: options,
              cancelButtonIndex: 0,
              userInterfaceStyle: 'light',
              destructiveButtonIndex: 1
            },
            buttonIndex => {
              setTemplate(buttonIndex)
            }
          );
    }

    const endWorkout = () => {
        setTemplate(0);
    }
    
    if(template == 0){
        return (
            <View>
                <Button title='Start Workout' onPress={openMenu}/>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <Text key={workoutList[template-1].name}>{workoutList[template-1].name}</Text>
                {workoutList[template-1].exercises.map((x) => {
                    return (
                        <View style={styles.item}>
                            <Text style={styles.exercise} key={x}>{x}</Text>
                            <View style={styles.right_side}>
                                <TouchableHighlight style={styles.pr}>
                                    <Text style={{color:"#BA9B00"}}>PR</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.plus}>
                                    <Text style={{fontSize:24, fontWeight:"bold"}}>+</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    )
                })}
                <Button title='Add Exercise'/>
                <Button title='Add Media'/>
                <Button onPress={endWorkout} title='End Workout'/>
                <Text style={styles.timer}>12:34:56</Text>
            </View>
        )
    }
}