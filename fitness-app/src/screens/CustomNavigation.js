import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "./HomeScreen/HomeScreen";
import SearchScreen from "./SearchScreen/SearchScreen";
import PostScreen from "./PostScreen/PostScreen";
import MapScreen from "./MapScreen/MapScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";

const Stack = createStackNavigator();

const HomeScreenNavigator = ({user, setUser}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home">
                {props => <HomeScreen {...props} user={user} setUser = {setUser}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export {HomeScreenNavigator}

const SearchScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen}/>
        </Stack.Navigator>
    )
}

export {SearchScreenNavigator}

const PostScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Post" component={PostScreen}/>
        </Stack.Navigator>
    )
}

export {PostScreenNavigator}

const MapScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Map Screen" component={MapScreen}/>
        </Stack.Navigator>
    )
}

export {MapScreenNavigator}

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile Screen" component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

export {ProfileScreenNavigator}