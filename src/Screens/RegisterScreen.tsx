import { ScrollView, StyleSheet, Text, View, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Colors from '../Utilities/Constant'
import InputField from '../Components/InputField'
import RoundedButton from '../Components/RoundedButton'
import SocialView from '../Components/SocialView'
import CheckBox from 'react-native-check-box'
import TextButton from '../Components/TextButton'
import { useNavigation } from '@react-navigation/native'
import FooterView from '../Components/FooterView'
import DividerView from '../Components/DividerView'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passowrdErrorMsg, setPassowrdErrorMsg] = useState('');
  const [userNameErrorMsg, setuserNameErrorMsg] = useState('');
  const navigation = useNavigation();
  
  // Need to explore this useRef
  const isEmailFirstRender = useRef(true);
  const isPasswordFirstRender = useRef(true);
  const isUserNameFirstRender = useRef(true);

  

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


  useEffect(() => {
    if (isUserNameFirstRender.current) {
      isUserNameFirstRender.current = false;
      return;
    }
    userNameValidate();
  }, [userName]);

 const handledSignInPress = () => {
    console.log('clicked on sign in')
 }
  
 const handledPrivacyPolicy = () => {
         Linking.openURL('https://www.google.co.in/')
  }
  
  const handledTermsOfService = () => {
    Linking.openURL('https://www.google.co.in/')
  }

  const handleLoginNavigation = () => {
     console.log('clicked on register')
     navigation.goBack();
  }
  
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

  function userNameValidate() {
    const isUserNameEmpty = userName.trim().length === 0;
    const isUserNameTooShort = !isUserNameEmpty && userName.length < 6;
      // Set email validation
      if (isUserNameEmpty) {
        setuserNameErrorMsg('User Name is required');
      } else if (isUserNameTooShort) {
        setuserNameErrorMsg('Enter a valid User Name');
      } else {
        setuserNameErrorMsg('');
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create your new{'\n'}account.</Text>
        <Text style={styles.subTitle}>Create an account to start looking for the food you like</Text>
         <InputField {...{
        title: 'Email Address',
        value: email,
        placeHolder: 'Enter Email',
          onChange: setEmail,
          isSecure: false,
          errorMsg: emailErrorMsg
        }} />

        <InputField {...{
        title: 'User Name',
        value: userName,
        placeHolder: 'Enter Email',
          onChange: setUserName,
          isSecure: false,
          errorMsg: userNameErrorMsg
        }} />
        
      <InputField {...{
        title: 'Password',
        value: password,
        placeHolder: 'Enter Password',
          onChange: setPassword,
          isSecure: true,
          errorMsg: passowrdErrorMsg
        }} />
        <View style={styles.checkBoxContainer}>
          <CheckBox
        style={{flex: 0, padding: 0}}
        onClick={()=>{
        setIsChecked(!isChecked)
        }}
        isChecked={isChecked}
        />
        <Text style={{color: Colors.primaryColor, fontSize: 14}}>I Agree with</Text>
        <TextButton {...{ onClick: handledTermsOfService, title: "Terms of Service" }} />

        <Text style={{color: Colors.primaryColor, fontSize: 14}}> and </Text>
        <TextButton {...{ onClick: handledPrivacyPolicy, title: "Privacy Policy" }} />
        </View>

        <RoundedButton {...{
        title: 'Sign Up',
        onClick: handledSignInPress
        }} />
      
        <DividerView {...{ title: 'Or sign in with' }} />
        
        <SocialView />
        
        <FooterView {...{ onPress: handleLoginNavigation, title: "Login" }} />
        
      </ScrollView>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
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
    marginTop: 8,
    marginBottom: 35,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginBottom: 40,
  },
})