import { StyleSheet, View, FlatList, Dimensions, Image } from 'react-native'
import React, { PropsWithChildren, useState } from 'react'

const { height, width } = Dimensions.get('window');

type ProductProsp = PropsWithChildren<{productItem: ProductTypes}>;
const ProductSlider = (props: ProductProsp) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <>
      <FlatList
        data={props.productItem.images}
        showsHorizontalScrollIndicator={false}
        pagingEnabled = {true}
        horizontal
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          const index = Math.round(x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <View style={styles.imgContainer}>
             <Image
              source={{ uri: props.productItem.images[index]}} 
              style={styles.productImage}/>
          </View>
        }}/>
          <View style={styles.sliderIndicator}>
              {props.productItem.images.map((item, index) => {
                return <View style={{
                  height: 8,
                  width: 32,
                  backgroundColor: currentIndex == index? '#FE8C00' : '#F3F3F3',
                  borderRadius: 4,
                  position: 'relative',
                  bottom: 40
                }}></View>
              })}
              </View></>
  )
}

export default ProductSlider
const styles = StyleSheet.create({
  sliderIndicator: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
    productImage: {
        height: '100%',
        width: '100%',
    },
    imgContainer: {
        height: height / 2,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }
})