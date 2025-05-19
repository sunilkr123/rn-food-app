import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../Utilities/Constant';
import CartItem from '../../Components/Cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { onDeleteCartItem } from '../../store/productSlice';

const CartScreen = (): React.JSX.Element => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [disciuntPrice, setDisciuntPrice] = useState(0);
  const products = useSelector((state: RootState) => {
    console.log('Redux state:', state); // check the entire state
    return state.cartProducts;
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const totalPrice = products.reduce((sum, product) => {
      const quantity = product.cartQuantity ?? 1;
      const price = product.price ?? 0;
      return sum + quantity * price;
    }, 0);
    setTotalPrice(totalPrice)
  console.log('products lenth is', products.length)
  }, [products]);
  
  return (
    products.length != 0 ? 
    <SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1, paddingHorizontal: 16 }}>
    <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 20 }}>My Cart</Text>
    <View style={{
      height: 45,
      borderRadius: 22.5,
      borderWidth: 1,
      borderColor: '#C2C2C2',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 4,
      marginBottom: 16,
    }}>
      <Image source={require('../../assets/icons/promo.png')} style={{ height: 30, width: 30 }} />
      <TextInput
        placeholder='Promo Code. . .'
        onChangeText={(text) => setPromoCode(text)}
        style={{ flex: 1, paddingHorizontal: 4 }}
      />
      <TouchableOpacity
        style={{
          width: 100,
          height: 40,
          backgroundColor: Colors.yellowColor,
          justifyContent: 'center',
          borderRadius: 20,
        }}
        onPress={() => {}}>
        <Text style={{ textAlign: 'center', color: 'white' }}>Applay</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={products}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <CartItem
          cartItem={item}
          onDeleteItem={() => dispatch(onDeleteCartItem(item.id))}
        />
      )}
      contentContainerStyle={{ paddingBottom: 24 }}
      ListFooterComponent={
        <View style={{
          borderWidth: 1,
          borderColor: '#D2CECE',
          borderRadius: 10,
          padding: 10,
          marginTop: 20
        }}>
          <Text style={{ marginBottom: 16, fontSize: 16, fontWeight: '700' }}>Payment Summary</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45 }}>
            <Text style={{ color: '#A4A4A4' }}>Total Items ({products.length ?? 1})</Text>
            <Text style={{ color: 'black' }}>${totalPrice.toFixed()}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45 }}>
            <Text style={{ color: '#A4A4A4' }}>Delivery Fee</Text>
            <Text style={{ color: 'black' }}>Free</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45 }}>
            <Text style={{ color: '#A4A4A4' }}>Discount</Text>
            <Text style={{ color: Colors.yellowColor }}>-$0</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45 }}>
            <Text style={{ color: '#A4A4A4' }}>Total</Text>
            <Text style={{ color: 'black' }}>${totalPrice.toFixed()}</Text>
          </View>
        </View>
      }
    />
  </View>
</SafeAreaView>
 :  <View style={styles.emptyContainer}>
      <Text style={styles.message}>No items in your cart at the moment</Text>
    </View>
  )
}
export default CartScreen

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1, // Take up the whole screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  message: {
    textAlign: 'center',
    fontSize: 16, // Optional styling
    color: '#555', // Optional styling
  },
})