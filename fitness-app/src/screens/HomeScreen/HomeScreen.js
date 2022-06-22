import React from 'react'
import { Text, View, Button} from 'react-native'
import PostsFeed from '../../components/PostsFeed/PostsFeed';

export default function HomeScreen({navigation, user, setUser}) {

    const logout = () => {
        setUser(null);
    }

    return (
        <View>
            <PostsFeed/>
            {/* <Button title='Logout' onPress={logout}/> */}
        </View>
    )
}