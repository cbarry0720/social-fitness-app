import React from 'react'
import { Text, View} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {FontAwesome5} from "react-native-vector-icons"
import styles from './styles'

export default function SearchScreen({navigation}) {

    return (
        <View>
            <TextInput autoFocus={true} returnKeyType="search" keyboardType="web-search" clearButtonMode="always" style={styles.bar} placeholder="Search"/>
        </View>
    )
}