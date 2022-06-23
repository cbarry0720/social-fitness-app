import React, { useState } from 'react'
import { Text, View, Button} from 'react-native'
import { ActionSheetIOS } from 'react-native';

export default function PostScreen({navigation}) {


    const [template, setTemplate] = useState();
    const actions = [
        "Cancel",
        "--New Workout--",
        "Workout 1",
        "Workout 2"
    ]

    const openMenu = function(){
        ActionSheetIOS.showActionSheetWithOptions(
            {
              options: actions,
              cancelButtonIndex: 0,
              userInterfaceStyle: 'light',
              destructiveButtonIndex: 1
            },
            buttonIndex => {
              console.log(buttonIndex)
            }
          );
    }

    return (
        <View>
            <Button title='Start Workout' onPress={openMenu}/>
        </View>
    )
}