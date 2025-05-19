import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Utilities/Constant'

const OTPScreen = () => {
  return (
    <View style={{paddingTop: 100, paddingHorizontal: 24}}>
          <Text style={{
              color: Colors.primaryColor,
              fontSize: 28,
              fontWeight: 'bold',
              marginBottom: 20
          }}>Email verification</Text>
          <Text style={{
              color: Colors.primaryColor,
              fontSize: 16,
              fontWeight: '300'
          }}>Enter the verification code we send you on:
              Alberts******@gmail.com|</Text>
          
    </View>
  )
}

export default OTPScreen

const styles = StyleSheet.create({})