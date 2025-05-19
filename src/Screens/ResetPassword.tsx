import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native'
import React, { useRef, useState } from 'react'
import Colors from '../Utilities/Constant'
import InputField from '../Components/InputField'
import { useNavigation } from '@react-navigation/native'
import RoundedButton from '../Components/RoundedButton'
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context'

const { height } = Dimensions.get('window');

const ResetPassword = (): React.JSX.Element => {
     const navigation = useNavigation();
     const [password, setPassword] = useState('asfasfasf');
     const [confirmPassword, setConfirmPassword] = useState('asfas');
    const sheetRef = useRef<BottomSheetMethods>(null);
    
  
    const handledVerifyAccount = () => {
         sheetRef.current?.open()
    }

    const handledCloseBottomSheet = () => {
         sheetRef.current?.close()
    }
    return (
      <View style={styles.container}>
      <KeyboardAvoidingView
       style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subTitle}>Your new password must be different from the previously used password</Text>
      
      <InputField {...{
        title: 'New Password',
        value: password,
        placeHolder: 'Enter new password',
        onChange: setPassword,
              isSecure: true,
            errorMsg:''}} />

      <InputField {...{
        title: 'Confirm Password',
        value: confirmPassword,
        placeHolder: 'Enter confirm password',
        onChange: setConfirmPassword,
              isSecure: true,
            errorMsg: ''}} />

     <View style={{ height: height * 0.3 }}></View>
                    
     <RoundedButton {...{
        title: 'Verify Account',
        onClick: handledVerifyAccount,
        bottomPadding: 0}} />
      </ScrollView>
      </KeyboardAvoidingView>  
     <BottomSheet ref={sheetRef}>
        <View style={styles.sheetConatiner}>
        <View style={styles.sheetImageContainer}>
        <Image
        style={styles.stretch}
        source={require('../assets/success.png')}/>
        </View>
        <Text style={styles.passwordText}> Password Changed</Text>
        <Text style={styles.passwordSubtitle}>Password changed successfully, you can login again with a new password</Text>
            <RoundedButton {...{
        title: 'Verify Account',
                onClick: handledCloseBottomSheet,
        bottomPadding: 0
              }} />
        </View>
      </BottomSheet>
    </View>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
    // justifyContent: 'flex-start'
  },
  title: {
    color: Colors.primaryColor,
    fontWeight: '600',
    fontSize: 35,
    paddingTop: 20,
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
    stretch: {
        height: 200,
        width: 200,
        marginBottom: 20
    },
    sheetImageContainer: {
        alignItems: 'center'
    },
    sheetConatiner: {
    paddingHorizontal: 20,
    },
    passwordText: {
        fontSize: 22, 
        fontWeight: '700',
        textAlign: 'center',
        color: Colors.primaryColor,
        marginBottom: 20
    },
    passwordSubtitle:{
        color: '#878787',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    }
})