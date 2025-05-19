import { Alert, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductGrid from '../../Components/home/ProductGrid';
import Loader from '../Common/Loader';
import { StackScreens } from '../../App'
import { NavigationContainerProps } from '@react-navigation/native';

type prosType = NavigationContainerProps<StackScreens, 'allProducts'>;

const AllProducts = (props: prosType) => {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const { navigation } = props;
  
  useEffect(
    () => {
    setIsLoaderVisible(true);
    fetch('https://dummyjson.com/products')
    .then((result) => result.json())
    .then((response: ProductResponse) => {
      setProduct(response);
      console.log('Fetched products:', response.products);
      setIsLoaderVisible(false);
    })
    .catch((error) =>
      Alert.alert('Error Occurred', error.message || 'Unknown error', [
        { text: 'Okay', onPress: () => console.log('Okay clicked') },
      ]));
      }, []
  );
  
  return (
      <>
    <ScrollView>
    <FlatList
    style={{marginTop: 20, paddingHorizontal: 16}}
    data={product?.products}
    keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) =>
            <TouchableOpacity onPress={
              () => navigation.navigate('ProductDetails',
                { id: itemData.item.id })
            }>
          <ProductGrid {...{product: itemData.item,}} />
          </TouchableOpacity>}
      numColumns={2}
      scrollEnabled={false}/>
    </ScrollView>
    <Loader {...{isVisible: isLoaderVisible}} />
      </>

  )
}

export default AllProducts

const styles = StyleSheet.create({})