import { StyleSheet, Image, TouchableOpacity, View, Dimensions, Text} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window');

type Product = {
  product: ProductTypes,
}
const ProductGrid = (props: Product) => {
  return (
    <View style={styles.container}>
      <Image
          source={{ uri: props.product.thumbnail}} 
           style={styles.image}
        />

        <View style={{ height: 2, width: '100%', backgroundColor: '#F9F5F5' }}></View>

        <View style={{ paddingHorizontal: 10, marginTop: 8 }}>
          
          <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 8 }}>{props.product.title}</Text>
          
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Ionicons name='star' size={16} color={'#FE8C00'} />
          <Text style={{paddingLeft: 6}}>{props.product.rating}</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>

            <Ionicons name='location'
              size={16}
              color={'#FE8C00'} />
            
              <Text style={{paddingLeft: 6}}>190m</Text>
              </View>
        </View>
        
        <Text style={{
          color: '#FE8C00',
          fontWeight: '500',
            fontSize: 16,
            marginBottom: 20,
            marginTop: 8
        }}>Price: ${props.product.price}</Text>
        </View>
        
       <TouchableOpacity style={styles.iconContainer}>
        <Icon name="favorite-border" size={24} color="red" />
        </TouchableOpacity>
    </View>
  )
}

export default ProductGrid

const styles = StyleSheet.create({
  container: {
    width: (width-80)/2,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // paddingHorizontal: 10,
    paddingTop: 4
  },
  image: {
    width: '100%',
    aspectRatio: 0.9,
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 4,
    borderRadius: 16,
    zIndex: 1,
  },
});
