import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import InputField from '../Components/InputField'
import RoundedButton from '../Components/RoundedButton';
import Colors from '../Utilities/Constant';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import ForgotPasswordItem from '../Components/forgotpassword/ForgotPasswordItem';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';

const {height } = Dimensions.get('window');

const ForgotPasswordScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isMobileSelected, setIsMobileSelected] = useState(false);
  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();

    function handleContinue() {
      sheetRef.current?.open()
    }
    
  const handledBottomContinue = () => {
    sheetRef.current?.close()
    navigation.navigate('resetPassword')
  }


  return (
 <View style={styles.container}>
      <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
  >
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.subTitle}>
        Enter your email address and we’ll send you confirmation code to reset your password
      </Text>

      <View style={styles.contentContainer}>
        <InputField
          title="Email Address"
          value={email}
          placeHolder="Enter Email"
          onChange={setEmail}
                isSecure={false}
                errorMsg=''
          
        />
      </View>

      {/* Spacer to push the button to the bottom */}
      <View style={{ flex: 0.8 }} />

      <RoundedButton
        title="Continue"
        onClick={handleContinue}
      />
    </View>
  </ScrollView>
</KeyboardAvoidingView>
      <BottomSheet ref={sheetRef}>
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.sheetTitle}> Forgot password?  </Text>
        <Text style={styles.sheetSubtitle}>Select which contact details should we use to reset your password</Text>

          < TouchableOpacity onPress={() => {
            setIsEmailSelected(false)
            setIsMobileSelected(true)
          }}>
            <ForgotPasswordItem {...{
            iconColor: 'black' ,
            iconName: 'whatsapp' ,
            value: '+91 9713136543',
            title: 'Send via WhatsApp',
            isChecked: isMobileSelected
          }} />
          </TouchableOpacity>
        
          <TouchableOpacity onPress={() => {
            setIsEmailSelected(true)
            setIsMobileSelected(false)
          }} style={{marginBottom: 20}}>
          <ForgotPasswordItem {...{
            iconColor: 'black',
            iconName: 'envelope' ,
            value: 'Albertstevano@gmail.com',
            title: 'Send via Email',
            isChecked: isEmailSelected
          }}/>
          </TouchableOpacity>

          
        <RoundedButton {...{
        title: 'Continue',
            onClick: handledBottomContinue,
        bottomPadding: 0
      }} />
        </View>
      </BottomSheet>
    </View>
  )
}

export default ForgotPasswordScreen


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
     flex: 1,
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    bottom: 20,  
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
  bottomSheetContainer: {
    paddingHorizontal: 24
  },
  leadingIcon: {
    height: 36,
    width: 36,
    borderRadius: 8,
    backgroundColor: '#E3E3EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  itemContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FF9C44',
    borderRadius: 6,
    height: 65,
    alignItems: 'center',
    padding: 8
   },
  sheetTitle: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  sheetSubtitle: {
    color: '#878787',
    fontSize: 16,
    fontWeight: '300',
    paddingBottom: 24
  }
})