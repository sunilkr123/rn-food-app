import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainerProps } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { StackScreens } from '../App';

const { width, height } = Dimensions.get('window');
type splashProps = NavigationContainerProps<StackScreens, 'splash'>;

const Splash = ({navigation}: splashProps) => {

    useEffect(() => {
        getAccessToken();
      }, [])
    
      const getAccessToken = async () => {
        try {
          const value = await AsyncStorage.getItem('access-token');
          console.log(`access token is ${value}`)
          setTimeout(() => {
            console.log('This runs after 2 seconds');
          }, 2000); // delay in milliseconds
          if (value != null) {
            navigation.replace('tabBar')
          } else {
            navigation.replace('login')
          }
        } catch (e) {
          setTimeout(() => {
            console.log('This runs after 2 seconds');
          }, 2000); // delay in milliseconds
            navigation.replace('login')
          return null;
        }
      };

    return (<Image
        style={styles.container}
        source={require('../assets/screens/splash.png')}
        resizeMode='cover'/>)
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width
    }
})