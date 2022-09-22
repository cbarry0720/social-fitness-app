import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';
import { HomeScreenNavigator, SearchScreenNavigator, PostScreenNavigator, MapScreenNavigator, ProfileScreenNavigator } from './src/screens/CustomNavigation';
import { decode, encode } from "base-64";
import {firestore, auth} from "./src/firebase/config"
import { collection, doc, getDoc } from 'firebase/firestore';
import {MaterialCommunityIcons, FontAwesome5, Ionicons} from "react-native-vector-icons";
if (!global.btoa){global.btoa = encode}
if (!global.atob){global.atob = decode}


//navigators for navbar and buttons
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


//main application
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //on load, checks login credentials
  useEffect(() => {
    const usersRef = collection(firestore, 'users');
    auth.onAuthStateChanged(user => {
      if (user) {
        getDoc(doc(usersRef, user.uid))
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            console.error(error)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  
  return (
    <NavigationContainer>
        { user ? (
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home Screen" options={{tabBarShowLabel: false, 
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
          )}}>
              {props => <HomeScreenNavigator {...props} user={user} setUser = {setUser}/>}
            </Tab.Screen>
            <Tab.Screen name='Search Screen' component={SearchScreenNavigator} options={{tabBarShowLabel: false, 
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
          )}}/>
            <Tab.Screen name='Post Screen' component={PostScreenNavigator} options={{tabBarShowLabel: false, 
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="dumbbell" color={color} size={size} />
          )}}/>
            <Tab.Screen name='Map Screen' component={MapScreenNavigator} options={{tabBarShowLabel: false, 
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="map" color={color} size={size} />
          )}}/>
            <Tab.Screen name='Profile Screen' component={ProfileScreenNavigator} options={{tabBarShowLabel: false, 
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" color={color} size={size} />
          )}}/>
          </Tab.Navigator>
        ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setUser = {setUser}/>}
            </Stack.Screen>
            <Stack.Screen name="Registration">
              {props => <RegistrationScreen {...props} setUser = {setUser}/>}
            </Stack.Screen>
        </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}