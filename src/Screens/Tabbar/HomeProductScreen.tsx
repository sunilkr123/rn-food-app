import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProductGrid from '../../Components/home/ProductGrid'
import Loader from '../Common/Loader'
import { StackScreens } from '../../App'
import { NativeStackNavigatorProps } from '@react-navigation/native-stack'

type propsType = NativeStackNavigatorProps<StackScreens, 'tabBar'>;

const HomeProductScreen = (props: propsType): React.JSX.Element => {
  const [productCategory, setProductCategory] = useState<Category[]>([]);
  const [product, setProduct] = useState<ProductResponse | null>(null);
  // const navigation = useNavigation()
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const { navigation } = props;
  
  useEffect(() => {
    setIsLoaderVisible(true);
    const fetchCategoriesAndDetails = async () => {
      try {
        const categoryResponse = await fetch('https://dummyjson.com/products/categories');
        const categories: Category[] = await categoryResponse.json();
        if (categories.length > 0) {
          const firstCategory = categories[0];
          console.log('First category:', firstCategory);
          const updatedCategories = categories.map(cat =>
            cat.name === firstCategory.name
              ? { ...cat, isSelected: true }
              : { ...cat, isSelected: false }
          );
          setProductCategory(updatedCategories);
          getProducts(firstCategory.url);
        }
      } catch (error) {
        Alert.alert('Alert Title', `${error}`, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    };
  
    fetchCategoriesAndDetails();
  }, []);

  
  
  function getProducts(url: string) {
    console.log(`url ${url}`)
    fetch(url)
    .then((result) => result.json())
    .then((response: ProductResponse) => {
      setProduct(response);
      setIsLoaderVisible(false);
      console.log('Fetched products:', response.products);
    })
    .catch((error) =>
      Alert.alert('Error Occurred', error.message || 'Unknown error', [
        { text: 'Okay', onPress: () => console.log('Okay clicked') },
      ])
    );
  }

  function handleCateGories(e: Category): void {
    setIsLoaderVisible(true);
    const updatedCategories = productCategory.map(cat =>
      cat.name === e.name
        ? { ...cat, isSelected: true }
        : { ...cat, isSelected: false }
    );
    getProducts(e.url);
    setProductCategory(updatedCategories);
  }
  
  return (
    <>
      <View style={styles.container}>
      <ScrollView>
      <ImageBackground
      source={require('../../assets/screens/home-header.png')} 
      style={styles.stretch}
      resizeMode="cover"
      >
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <View style={styles.locationContainer}>
            <View style={styles.txtLocation}>
              <Text style={{ color: 'white' }}>Your Location</Text>
               <Ionicons name='chevron-down'
                size={24}
                color={'white'}/>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}>
               <Ionicons name='location'
                size={24}
                color={'white'}/>
              <Text style={{ color: 'white' }}>New York City</Text>
              </View>
              
            <Text style={styles.headerText}>Provide the best{'\n'}food for you</Text>
            </View>
            <View style={{flexDirection: 'row'}} >
              <Ionicons
                name='search'
                size={32}
                color={'white'}
                style={ {paddingHorizontal: 10}} />
              <Ionicons name='notifications'
                size={32}
                color={'white'}/>
            </View>

          </View>
        </SafeAreaView>
      </ImageBackground>
     
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 24
      }}>
        <Text style={styles.categoryTitle}>Find by Category</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('allProducts')}>
          <Text style={styles.seelTxt}>See All</Text>
        </TouchableOpacity>
         </View>
         
      <FlatList
        style={styles.categoriesConatiner}
         horizontal = {true}
        data={productCategory}
        keyExtractor={(item) => (item.slug)}
           renderItem={(itemData) => (
          <TouchableOpacity onPress={() => handleCateGories(itemData.item)}>
          <View style={[styles.categoriesItem, {backgroundColor: itemData.item.isSelected == true ? '#FE8C00' : 'white',}]}>
          {/* <Image style={styles.categoryImage}
            source={require('../../assets/categories/burger.png')} /> */}
            <Text style={[styles.txtCategioryItem,
            { color: itemData.item.isSelected == true ? 'white' : '#FE8C00' }]}>{itemData.item.name}</Text>
          </View></TouchableOpacity>)} />
      
      <FlatList
        style={{marginTop: 20, paddingHorizontal: 16        }}
        data={product?.products}
        keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => <TouchableOpacity onPress={() => {
             navigation.navigate('ProductDetails', {id: itemData.item.id})
           }}><ProductGrid {...{product: itemData.item, paramType: props}} /></TouchableOpacity>}
          numColumns={2}
          scrollEnabled={false}
        />
        </ScrollView>
      </View>
      <Loader {...{isVisible: isLoaderVisible}} />
   </>

  )
}

export default HomeProductScreen

const styles = StyleSheet.create({
  categoriesConatiner: {
    paddingLeft: 20,
    marginTop: 10,
  },
  container: { flex: 1 },
  categoryImage: {
    height: 30,
    width: 30,
    marginBottom: 10
  },
  categoriesItem:
  {
    height: 40,
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 8,     
   },
  stretch: {
    height: 250,
  },
    background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  txtCategioryItem: {
    fontSize: 16,
    fontWeight: '600'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  txtLocation: {
              flexDirection: 'row',
               alignItems: 'flex-start'
  },
  headerText: {
    fontSize: 32,
    color: 'white',
    paddingTop: 40
  },
  categoryTitle: {
        flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
        // paddingHorizontal: 24,
        // paddingTop: 24
  },
  seelTxt: {
            color: '#FE8C00',
            fontSize: 16,
            fontWeight: '500'
          }
})