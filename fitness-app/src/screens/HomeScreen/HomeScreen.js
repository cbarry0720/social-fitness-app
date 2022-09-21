import React from 'react'
import { Text, View, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PostsFeed from '../../components/PostsFeed/PostsFeed';

export default function HomeScreen({navigation, user, setUser}) {

    const logout = () => {
        setUser(null);
    }
    //just returns the posts feed...i guess
    return (
        <View>
            <TouchableOpacity onPress={logout}><Text>
                Logout</Text></TouchableOpacity>
            <PostsFeed/>
            {/* <Button title='Logout' onPress={logout}/> */}
        </View>
    )
}