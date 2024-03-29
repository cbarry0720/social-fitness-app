import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { Platform, TouchableOpacity } from "react-native";
import {Ionicons} from "react-native-vector-icons";
import HomeScreen from "./HomeScreen/HomeScreen";
import SearchScreen from "./SearchScreen/SearchScreen";
import PostScreen from "./PostScreen/PostScreen";
import MapScreen from "./MapScreen/MapScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import { Image } from "react-native";
import WorkoutScreen from "../components/Workouts/WorkoutScreen";

const Stack = createStackNavigator();

//header icons
const headerOptions = {
    headerLeft: () => (
    <TouchableOpacity>
        <Ionicons style={{paddingLeft:20, fontSize: 30}} name="chatbubble"/>
    </TouchableOpacity>),
    headerTitle: () => (
    <TouchableOpacity>
        <Image style={{width:150, height:40}} source={Platform.OS == "web" ? {uri: require("../../assets/fitfluence-light.jpg")} : require("../../assets/fitfluence-light.jpg")}/>
    </TouchableOpacity>),
    headerRight: () => (
    <TouchableOpacity>
        <Ionicons style={{paddingRight:20, fontSize:30}} name="notifications"/>
    </TouchableOpacity>),
    headerTitleAlign: "center"
}

const HomeScreenNavigator = ({user, setUser}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={headerOptions}>
                {props => <HomeScreen {...props} user={user} setUser = {setUser}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export {HomeScreenNavigator}

const SearchScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={headerOptions} name="Search" component={SearchScreen}/>
            <Stack.Screen name="Profile">
                {props => <ProfileScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export {SearchScreenNavigator}

const PostScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={headerOptions} name="Post" component={PostScreen}/>
        </Stack.Navigator>
    )
}

export {PostScreenNavigator}

const MapScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Map" component={MapScreen}/>
        </Stack.Navigator>
    )
}

export {MapScreenNavigator}

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={headerOptions} name="Profile">
                {props => <ProfileScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="My Workout" options={({ route }) => ({ title: route.params.name })} component={WorkoutScreen}/>
        </Stack.Navigator>
    )
}

export {ProfileScreenNavigator}