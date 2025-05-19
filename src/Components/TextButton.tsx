import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'
import Colors from '../Utilities/Constant'

type ClickEvent = PropsWithChildren<
    {
        onClick: () => void,
        title: string
    }
    >;

const TextButton = (props: ClickEvent): React.JSX.Element => {
  return (
 <Pressable
    style={({pressed}) => [pressed && styles.pressed]}
                 onPress={props.onClick}>
          <Text style={styles.registertxt}>{props.title}</Text>
             </Pressable>
  )
}

export default TextButton

const styles = StyleSheet.create({
    pressed: {
      opacity: 0.6
    },
    registertxt: {
    fontSize: 16,
    color: Colors.yellowColor,
    fontWeight: '500'
  },
})