import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Utilities/Constant'
import { PropsWithChildren } from 'react'

type ButtonTitle = PropsWithChildren<{
    title: string,
    onClick: () => void
}>;

const RoundedButton = (props: ButtonTitle): React.JSX.Element => {
    return (
        <Pressable
            style={({pressed}) => [styles.container, pressed && styles.pressed]}
        onPress={props.onClick}>
      <Text style={styles.buttonTxt}>{props.title}</Text>
    </Pressable>
  )
}

export default RoundedButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.yellowColor,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 27.5
    },
    buttonTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    pressed: {
        opacity: 0.6
    }
})