import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

type cartPropsType = {
  cartItem: ProductTypes,
  onDeleteItem: ()=>void
}

const CartItem = (props: cartPropsType) => {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 24, marginBottom: 16}}>
          <Image    source={{ uri: props.cartItem.thumbnail}}  style={{ height: 90, width: 90, borderRadius: 10 }} />
          <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
              <Text>Burger With Meat</Text>
        <Text style={{ marginVertical: 10, color: '#FE8C00', fontWeight: '600' }}>$ {props.cartItem.price}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' , justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{
                      height: 22,
                      width: 22,
                      borderRadius: 11,
                      borderColor: 'black',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                  <Text style={{fontSize: 16}}>-</Text>
                  </View> 
                  <Text style={{marginHorizontal: 5}}>1</Text>
                  <View style={{
                      height: 22,
                      width: 22,
                      borderRadius: 11,
                      borderColor: 'black',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                  <Text>+</Text>
                  </View> 
          </View>
          <TouchableOpacity onPress={props.onDeleteItem}>
          <Ionicons name='trash' size={24} color={'#F14141'}/>
          </TouchableOpacity>
              </View>
              
          </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({})