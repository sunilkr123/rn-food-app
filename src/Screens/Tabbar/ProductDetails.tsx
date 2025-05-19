import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native'
import { NavigationContainerProps, useFocusEffect} from '@react-navigation/native';
import Colors from '../../Utilities/Constant';
import ProductSlider from '../../Components/productDetails/ProductSlider';
import AddToCartButton from '../../Components/productDetails/ProductBottomView';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReviewList from '../../Components/productDetails/ReviewItem';
import Loader from '../Common/Loader';
import { StackScreens } from '../../App'
import ReviewItem from '../../Components/productDetails/ReviewItem';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store';
import { onAddToCart, onUpdateCard, removeFromCart } from '../../store/productSlice';
 
type prosType = NavigationContainerProps<StackScreens, 'ProductDetails'>;

const ProductDetails = (props: prosType) => {
  const [product, setProduct] = useState<ProductTypes>();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const { navigation, route } = props;
  const { id } = route.params;
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => {
    console.log('Redux state:', state); // check the entire state
    return state.cartProducts;
  });
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const hasRunOnce = useRef(false);


  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused');
  
      const addedProducts = products.filter(item => item.id === id);
      if (addedProducts.length > 0) {
        console.log("ID is present");
        setIsAddedToCart(true);
  
        const cartQuantity = addedProducts[0]?.cartQuantity ?? 1;
        setProduct(prev => {
          if (!prev) return prev;
          return { ...prev, cartQuantity: cartQuantity };
        });
  
        console.log(`product cart quantity ${cartQuantity}`);
      } else {
        console.log("ID is not present");
        setIsAddedToCart(false);
      }
  
      // cleanup is not required unless you want to reset state
    }, [products, id])
  );
      
  useEffect(() => {
    setIsLoaderVisible(true);
    const url = `https://dummyjson.com/products/${id}`
    fetch(url)
      .then(result => result.json())
      .then(jsonResponse => {
        setProduct(jsonResponse)
        setIsLoaderVisible(false);
      })
      .catch(error => console.error())
  }, [id])

  function handleAddItem() {
    dispatch(onUpdateCard(product?.id ?? 0))
  }

  function handleRemoveItem() {
    dispatch(removeFromCart(product?.id ?? 0))
  }

  function handleAddToCart() {
    setIsAddedToCart(true)
    dispatch(onAddToCart(product!))
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={product?.reviews || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ReviewItem {...{reviewItems: item}} />} // Replace with actual render logic
          ListHeaderComponent={() => (
            <>
              {product && <ProductSlider productItem={product} />}
              <Text style={styles.txtProductTitle}>{product?.title}</Text>
              <Text style={styles.txtProductPrice}>$ {product?.price}</Text>
    
              <View style={styles.infoContainer}>
                <View style={styles.imageWithTxt}>
                  <Text style={styles.doller}>$</Text>
                  <Text style={styles.freeDelivery}>Free Delivery</Text>
                </View>
                <View style={styles.imageWithTxt}>
                  <Image style={styles.infoIcon} source={require('../../assets/icons/timing.png')} />
                  <Text style={styles.duration}>20-30</Text>
                </View>
                <View style={styles.imageWithTxt}>
                  <Image style={styles.infoIcon} source={require('../../assets/icons/ratting.png')} />
                  <Text style={styles.ratting}>{product?.rating}</Text>
                </View>
              </View>
    
              <Text style={styles.descriptionTxtTitle}>Description</Text>
              <Text style={styles.decriptionTxt}>{product?.description}</Text>
    
              <View style={styles.seeAllContainer}>
                <Text style={styles.recommendTxt}>Product Reviews</Text>
                {/* <Text style={styles.seeAllTxt}>See All</Text> */}
              </View>
            </>
          )}
          ListFooterComponent={<View style={{ height: 100 }} />} // To add spacing for AddToCartButton
        />
    
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.headerIcons} source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <Text style={styles.txtAboutProduct}>{product?.category.toUpperCase()}</Text>
          <Image style={styles.headerIcons} source={require('../../assets/icons/pfavourite.png')} />
        </View>
    
        <AddToCartButton {...{
          addItem: handleAddItem,
          removeItem: handleRemoveItem,
          totalAmount: product?.price ?? 0 * (product?.cartQuantity ?? 1),
          itemsCount: product?.cartQuantity ?? 0,
          addToCart: isAddedToCart ? () => {}: handleAddToCart,
          title: isAddedToCart ? 'Checkout' : 'Add to Cart'
        }} />
      </View>
      <Loader {...{ isVisible: isLoaderVisible }} />
    </>
  );
}

export default ProductDetails
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  txtAboutProduct: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400'
  },
  header: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 40 : 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    // backgroundColor: 'gray',
    // opacity: 0.2
  },
  headerIcons: {
    height: 32,
    width: 32,
  },
  txtProductTitle: {
    fontSize: 20,
    textAlign: 'left',
    marginHorizontal: 16,
    // marginVertical: 16
  },
  txtProductPrice: {
    fontSize: 16,
    textAlign: 'left',
    color: '#FE8C00',
    marginHorizontal: 16
  },
  infoContainer: {
    backgroundColor: 'rgba(254, 140, 0, 0.1)',
   marginHorizontal: 16,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   height: 45,
   marginVertical: 16,
   paddingHorizontal: 10,
   borderRadius: 8
  },
  doller: { fontSize: 18, color: '#FE8C00' },
  freeDelivery: { fontSize: 12, marginLeft: 8 },
  imageWithTxt: {flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoIcon: { height: 16, width: 16 },
  duration: { fontSize: 12, marginLeft: 8 },
  ratting: { fontSize: 12, marginLeft: 8 },
  descriptionTxtTitle: { marginHorizontal: 16, fontSize: 16, fontWeight: '500' },
  decriptionTxt: { marginHorizontal: 16, fontSize: 14, fontWeight: '400', marginVertical: 10 },
  seeAllContainer: { marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' },
  recommendTxt: { color: Colors.primaryColor, fontSize: 14, marginBottom: 5 },
  seeAllTxt: { color: '#FE8C00', fontSize: 16 },
  recommendedProducts: { marginTop: 20 },
})


