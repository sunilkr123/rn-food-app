import {ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
 import Colors from '../Utilities/Constant'
import InputField from '../Components/InputField'
import RoundedButton from '../Components/RoundedButton'
import SocialView from '../Components/SocialView'
import TextButton from '../Components/TextButton'
import { useNavigation } from '@react-navigation/native'
import FooterView from '../Components/FooterView'
import DividerView from '../Components/DividerView'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Common/Loader'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UserInfo = {
  id: number,
  username: string,
  email: string,
  lastName: string,
  gender: string,
  image: string,
  accessToken: string,
  refreshToken: string
}

const LoginScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passowrdErrorMsg, setPassowrdErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  
  // Need to explore this useRef
  const isEmailFirstRender = useRef(true);
  const isPasswordFirstRender = useRef(true);

useEffect(() => {
  if (isEmailFirstRender.current) {
    isEmailFirstRender.current = false;
    return;
  }
  emailValidate();
}, [email]);

useEffect(() => {
  if (isPasswordFirstRender.current) {
    isPasswordFirstRender.current = false;
    return;
  }
  passowrdValidate();
}, [password]);

  // login api calling
  function loginNetwrokCall() {
    let url = 'https://dummyjson.com/user/login'
    fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
            username: 'emilys',//'emilys'
            password: 'emilyspass',
            expiresInMins: 60, // optional, defaults to 60
          }),
    }).then(result => result.json())
      .then(jsonResponse => {
        const useInformation: UserInfo = jsonResponse
        console.log(`login response is ${useInformation.email}`)
        console.log(`login response is ${useInformation.accessToken}`)
        setIsLoaderVisible(false)
        setUserInfo(useInformation) 
        storeToken(useInformation.accessToken)
        navigation.navigate("tabBar");
    })
  }

  const storeToken = async (value: string) => {
    try {
      await AsyncStorage.setItem('access-token', value);
      console.log(`login response value is ${value}`)
    } catch (e) {
      console.log(`login response is ${e}`)
    }
  };

  function emailValidate() {
    const isEmailEmpty = email.trim().length === 0;
    const isEmailInvalid = !isEmailEmpty && !emailRegex.test(email);
      // Set email validation
      if (isEmailEmpty) {
        setEmailErrorMsg('Email is required');
      } else if (isEmailInvalid) {
        setEmailErrorMsg('Enter a valid email');
      } else {
        setEmailErrorMsg('');
      }
  }

  function passowrdValidate() {
    const isPasswordEmpty = password.trim().length === 0;
    const isPasswordTooShort = !isPasswordEmpty && password.length < 6;
  
    // Set password validation
    if (isPasswordEmpty) {
      setPassowrdErrorMsg('Password is required');
    } else if (isPasswordTooShort) {
      setPassowrdErrorMsg('Password must be at least 6 characters');
    } else {
      setPassowrdErrorMsg('');
    }
  }

  const handledSignInPress = () => {
    const isEmailEmpty = email.trim().length === 0;
    const isEmailInvalid = !isEmailEmpty && !emailRegex.test(email);
    const isPasswordEmpty = password.trim().length === 0;
    const isPasswordTooShort = !isPasswordEmpty && password.length < 6;
    emailValidate()
    passowrdValidate()
    // If all valid, navigate
    if (!isEmailEmpty && !isEmailInvalid && !isPasswordEmpty && !isPasswordTooShort) {
      setIsLoaderVisible(true)
      loginNetwrokCall()
    }
  };
  
  const handleRegisterNavigation = () => {
    console.log('clicked on register')
    navigation.navigate("register");
  }

    const handleForgotPassword = () => {
  navigation.navigate("forgotPassword");
  }

  return (
    <>
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator = {false}>
      <Text style={styles.title}>Login to your{'\n'}account.</Text>
      <Text style={styles.subTitle}>Please sign in to your account</Text>
      <InputField {...{
        title: 'Email Address',
        value: email,
        placeHolder: 'Enter Email',
        onChange: setEmail,
        isSecure: false,
        errorMsg: emailErrorMsg
      }} />

      <InputField {...{
        title: 'Password',
        value: password,
        placeHolder: 'Enter Password',
        onChange: setPassword,
        isSecure: true,
        errorMsg: passowrdErrorMsg
      }} />

      <View style={styles.passwordContainer}>          
      <TextButton {...{onClick: handleForgotPassword, title: "Forgot password?"}} />
      </View>
      
        <RoundedButton {...{
        title: 'Sign In',
            onClick: handledSignInPress,
        bottomPadding: 0
      }} />
      
        <DividerView {...{ title: 'Or sign in with' }} />
        
      <SocialView />
      <FooterView {...{onPress: handleRegisterNavigation, title: "Register"}} />
        </ScrollView>
      
        </View>
      <Loader {...{isVisible: isLoaderVisible}} />
    </>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    color: Colors.primaryColor,
    fontWeight: '600',
    fontSize: 35,
    paddingTop: 60,
    textAlign: 'left'
  },
  subTitle: {
    color: Colors.lightSubtitle,
    fontSize: 16,
    marginTop: 18,
    marginBottom: 35,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
})