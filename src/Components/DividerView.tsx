import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Divider from './Divider'
import { PropsWithChildren } from 'react'
import Colors from '../Utilities/Constant';

type Title = PropsWithChildren<{
    title: string
}>;

const DividerView = (props: Title): React.JSX.Element => {
  return (
        <View style={styles.dividerContainer}>
        <Divider />
          <Text style={styles.dividerTxt}>{props.title}</Text>
        <Divider />
        </View>
  )
}

export default DividerView

const styles = StyleSheet.create({
      dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  dividerTxt: {
    color: Colors.lightSubtitle,
    fontSize: 20,
    marginHorizontal: 10,
  },
})