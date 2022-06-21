import React from 'react'
import { Text, View, Button} from 'react-native'

export default function HomeScreen({navigation, user, setUser}) {

    const logout = () => {
        setUser(null);
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title='Logout' onPress={logout}/>
            <Text>{user.email}</Text>
        </View>
    )
}