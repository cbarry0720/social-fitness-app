import React, { useState } from 'react'
import { Text, View, Button, TextInput, Image, Alert} from 'react-native'
import styles from './styles';
import { ActionSheetIOS } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import exercisesJSON from "../../../exercises.json";
import ExerciseSearchList from '../../components/ExerciseSearchList/ExerciseSearchList';
import * as ImagePicker from "expo-image-picker";
import { storage, auth, firestore } from '../../firebase/config';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore"
import { Feather } from '@expo/vector-icons';

export default function PostScreen({navigation}) {

    //
    const [images, setImages] = useState([]);

    //state for selected workout
    const [workout, setWorkout] = useState({});

    //state for changing exercise search list
    const [exercisesSearched, setExercisesSearched] = useState([]);

    const [imageUploadIndex, setImageUploadIndex] = useState(0);

    //mock workout data
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
        },
    ]
    workoutList.unshift({name:"New Workout", exercises: []})

    //popup menu (action sheet)
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
                buttonIndex != 0 ? setWorkout(workoutList[buttonIndex-1]) : ""
            }
          );
    }

    //pressing on exercise within search
    const selectExercise = (exercise) => {
        let temp = workout
        let length = workout.exercises.length
        temp.exercises[length-1] = exercise.Name
        setWorkout(temp)
        setExercisesSearched([])  
    }

    //close workout
    const endWorkout = async function(){
        let path = `${Date.now()}-${auth.currentUser.uid}`
        uploadImagesToStorage(0, path);
        addDoc(collection(firestore, "posts"), {
            caption:"",
            comments:[],
            exercises: workout.exercises,
            images:images.map((x, i) => {
                return path + i
            }),
            likes: [],
            location:"",
            time: serverTimestamp(),
            userId: auth.currentUser.uid
        }).then((x) => {
            console.log(x.id);
        }).catch((e) => {
            Alert.alert("ERROR", e);
        })
    }
    
    //adding an exercise with "add exercise" button
    const addExercise = () => {
        if(workout.exercises.length > 0 && workout.exercises[workout.exercises.length - 1] == null){
            return
        }
        let temp = {
            name: workout.name,
            exercises: workout.exercises
        };
        temp.exercises.push(null)
        setWorkout(temp)
    }

    //on editing exercise search textbox change
    const exerciseChange = (text) => {
        if(text.length > 2){
            setExercisesSearched(exercisesJSON.filter(
                (x) => {
                    return x.Name.toLowerCase().indexOf(text.toLowerCase()) != -1;
                }
            ))
        }else{
            setExercisesSearched([])
        }
    }
    
    //choose file to upload
    const chooseFile = () => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        }).then( result => {
            if(!result.cancelled){
                let tempImages = [...images];
                tempImages.push(result.uri);
                setImages(tempImages);
            }
        });
    };

   async function uploadImagesToStorage(i, path) {
        if(i >= images.length){
            setImages([])
            setExercisesSearched([])
            setWorkout({});
            return;
        }
        console.log("Uploading...")
        let reference = ref(storage, path + i);
        fetch(images[i]).then(async function(img){
            img.blob().then(async function(bytes){
                uploadBytesResumable(reference, bytes).then(x => {
                    console.log("Upload Complete!")
                    uploadImagesToStorage(i+1)
                }).catch(e => {
                    console.error("error on upload")
                    console.error(e)
                });
                return true
            }).catch(e => {
                console.error("error on blob")
                console.error(e)
            })
        }).catch(e => {
            console.error("error on fetch")
            console.error(e)
        })
        return;
    }

    const removeImage = (uri) => {
        return () => {
            let tempImages = [...images];
            tempImages = tempImages.filter((x) => {
                return uri != x
            })
            setImages(tempImages)
        }
    }

    //starting page
    if(Object.values(workout).length == 0){
        return (
            <View style={styles.startWorkout}>
                <Button style={styles.startWorkoutButton} title='Start Workout' onPress={openMenu}/>
            </View>
        )
    }
    //currently working out / posting page
    else{
        return (
            <View style={styles.container}>
                <Text style={styles.title} key={workout.name}>{workout.name}</Text>
                {workout.exercises.map((x) => {
                    return x != null ? (
                        <View style={styles.item} key={x}>
                            <Text style={styles.exercise}>{x}</Text>
                            <View style={styles.right_side}>
                                <TouchableHighlight style={styles.pr}>
                                    <Text style={{color:"#BA9B00"}}>PR</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.plus}>
                                    <Text style={{fontSize:24, fontWeight:"bold"}}>+</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    ) :
                    (
                        <View key={"new exercise"}>
                            <TextInput style={styles.exerciseInput} onChangeText={exerciseChange} placeholder='Search Exercise'/>
                        </View>
                    )
                })}
                <View style={styles.imagesContainer}>
                    {images.map(x => {
                        return (
                        <View style={styles.imageContainer} key={x}>
                            <Image style={styles.image} source={{uri:x}}/>
                            <Feather name='x' style={styles.remove} onPress={removeImage(x)}/>
                        </View>
                        )
                    })}
                </View>
                {
                  exercisesSearched.length > 0 ? <ExerciseSearchList exercises={exercisesSearched} setExercise={selectExercise}/> : <></>
                }
                <Button onPress={addExercise} title='Add Exercise'/>
                <Button onPress={chooseFile} title='Add Media'/>
                <Button onPress={endWorkout} title='End Workout'/>
            </View>
        )
    }
}