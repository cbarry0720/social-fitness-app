import React from 'react'
import { Text, View, Button} from 'react-native'

export default function HomeScreen({navigation, user, setUser}) {

    const logout = () => {
        console.log("before");
        console.log(user, setUser)
        setUser(null);
        console.log("after")
        console.log(user, setUser)
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title='Logout' onPress={logout}/>
        </View>
    )
}