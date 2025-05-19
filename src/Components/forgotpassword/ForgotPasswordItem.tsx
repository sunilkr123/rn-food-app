import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


type itemParam = PropsWithChildren<{
    iconName: string,
    iconColor: string,
    value: string,
    title: string,
    isChecked: boolean
}>;

const ForgotPasswordItem = (props: itemParam) => {
  return (
<View style={[styles.itemContainer, {borderColor: props.isChecked ? "#FF9C44" : "#CCC9C9"}]}>
              <View style={styles.leadingIcon}>
              <Icon name={props.iconName} size={24} color={props.iconColor} />
            </View>

            <View style={{paddingLeft: 10}}>
              <Text style={{ fontSize: 16, color: '#878787', marginBottom: 8, marginTop: 8 }}>{props.title}</Text>
              <Text style={{color: '#292A2E', marginBottom: 8, fontWeight: '700'}}>{props.value}</Text>
          </View>
          {props.isChecked ? <Icon style={{
              right: 15,
              position: 'absolute'
          }} name={'check-circle'}
              size={32} color={'#FE8C00'} /> : null}

          </View>
  )
}

export default ForgotPasswordItem

const styles = StyleSheet.create({
      itemContainer: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#FF9C44',
    borderRadius: 8,
    height: 70,
    alignItems: 'center',
    padding: 8,
    marginBottom: 14
   },
  sheetTitle: {
    color: '#878787',
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 10
  },
  sheetSubtitle: {
    color: '#878787',
    fontSize: 16,
    fontWeight: '300',
    paddingBottom: 20
    },
    leadingIcon: {
    height: 36,
    width: 36,
    borderRadius: 8,
    backgroundColor: '#E3E3EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
})