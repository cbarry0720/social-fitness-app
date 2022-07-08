import React from 'react'
import { Text, View, Button} from 'react-native'
import PostsFeed from '../../components/PostsFeed/PostsFeed';

export default function HomeScreen({navigation, user, setUser}) {

    const logout = () => {
        setUser(null);
    }
    //just returns the posts feed...i guess
    return (
        <View>
            <PostsFeed/>
            {/* <Button title='Logout' onPress={logout}/> */}
        </View>
    )
}