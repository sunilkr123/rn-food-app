import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'
import TextButton from './TextButton';
import Colors from '../Utilities/Constant';

type callHandler = PropsWithChildren<
    {
        onPress: () => void,
        title: string
    }>;

const FooterView = (props: callHandler): React.JSX.Element => {
  return (
     <View style={styles.footerContainer}>
      <Text style={styles.dontHaveRegisterTxt}>Don't have an account? </Text>
      <TextButton {...{onClick: props.onPress, title: props.title}} />
      </View>
  )
}

export default FooterView

const styles = StyleSheet.create({
     footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    },
      dontHaveRegisterTxt: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontWeight: '400'
  },
})