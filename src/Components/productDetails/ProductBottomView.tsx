import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { PropsWithChildren } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type propsParam = PropsWithChildren<{
    addItem: () => void,
    removeItem: () => void,
    totalAmount: number,
    itemsCount: number,
    addToCart: () => void,
    title: string
}>;

const ProductBottomView = (props: propsParam) => {

  return (
      <View style={styles.bottomViewContainer}>
        {/* <View style={styles.cartInfoConatiner}>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={props.addItem}>
          <Text style={styles.addBtn}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                      <Text style={styles.countTxt}>{props.itemsCount}</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={props.removeItem}>
              <Text style={styles.minusTxt}>-</Text>
           </TouchableOpacity>
          </View>
              <Text style={styles.cartTotalPrice}>${props.totalAmount}</Text>
       </View> */}
      
          <TouchableOpacity onPress={props.addToCart}>
          <View style={styles.addToCartBtn}>
        <MaterialIcons name='add-shopping-cart' size={20} color={'white'}/>
          <Text style={styles.addToCartTxt}>{props.title}</Text>
        </View>  
          </TouchableOpacity>
      </View>
  )
}

export default ProductBottomView

const styles = StyleSheet.create({
    bottomViewContainer:         {
        backgroundColor: 'white',
        position: 'relative',
        bottom: 20,
      },
      cartInfoConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingTop: 14
      },
      actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      addBtn: { fontSize: 20, marginHorizontal: 10 },
      countTxt: { fontSize: 16, },
      minusTxt: { fontSize: 20, marginLeft: 10 },
      cartTotalPrice: { fontSize: 16, marginLeft: 10 },
      addToCartBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FE8C00',
        marginHorizontal: 24,
        marginTop: 14,
      },
      addToCartTxt: {color: 'white', fontSize: 16, fontWeight: '400'}
})