import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import Colors from '../Utilities/Constant'

const SocialView = () => {
  return (
      <View style={styles.socialImageContainer}>
          
       <View style={styles.imageContainer}>
          <Image source={require('./assets/images/google.png')}
            style={styles.socialImage} />
        </View>

          <View style={styles.imageContainer}>
          <Image source={require('./assets/images/facebook.png')}
          style={styles.socialImage} />
          </View>

         <View style={styles.imageContainer}>
          <Image source={require('./assets/images/apple.png')}
          style={styles.socialImage} />
          </View>
          
      </View>
  )
}

export default SocialView

const styles = StyleSheet.create({
    socialImage: {
    height: 30,
    width: 30,
   },
  socialImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 50
  },
  imageContainer: {
    backgroundColor: 'white',
    borderColor: Colors.lightSubtitle,
    padding: 10,
    borderWidth: 0.7,
    borderRadius: 25,
    marginHorizontal: 10
  }
})