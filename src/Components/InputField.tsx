import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { PropsWithChildren } from 'react'
import Colors from '../Utilities/Constant'
import Icon from 'react-native-vector-icons/FontAwesome';
 
 
type FieldConfig = PropsWithChildren<{
    title: string,
    value: string,
    placeHolder: string,
    onChange: (text: string) => void,
    isSecure: boolean,
    errorMsg: string
}>;

const InputField = (props: FieldConfig): React.JSX.Element => {
  const [isValid, setIsValid] = useState(false);
   const [updateEye, setUpdateEye] = useState(false);
         
  function validate(text: string) {
    if (text.length > 10) {
      setIsValid(true); 
    } else {
        setIsValid(false); 
    }
  }
  
  function hadleEyeOnpress() {
    const eyeValues = !updateEye;
    console.log(`eyeValues ${eyeValues}`);

    setUpdateEye(eyeValues)
  }

  return (
      <View style = {styles.container}>
      <Text style={styles.fieldTitle}>{props.title}</Text>
      <View style ={styles.inputContainer}>
      <TextInput
          style={styles.inputTxt}
          placeholder= {props.placeHolder}
          onChangeText={(text) => {
            validate(text)
            props.onChange(text);
        }}
        secureTextEntry={props.isSecure && !updateEye}
        />
        {props.isSecure ? <TouchableOpacity onPress={hadleEyeOnpress}><Icon name={ updateEye ? 'eye' : "eye-slash"} size={26} color={'black'} /></TouchableOpacity> : null}
      </View>
      {(isValid || props.errorMsg.length > 0) ? <Text style={styles.errText}>{props.errorMsg}</Text> : null}
      </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  container: {
  marginBottom: 10    
  },
   inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderWidth: 0.8,
    borderColor: Colors.borderColor,
    borderRadius: 6,
    flex: 1,
    paddingHorizontal: 8
  },
  fieldTitle: {
    color: Colors.primaryColor,
    fontSize: 16,
    paddingBottom: 5
  },
  inputTxt: {
    color: Colors.primaryColor,
    fontSize: 16,
    padding: 10,
    height: 54,
    flex: 1
  },
    errText: {
      color: 'red',
      paddingTop: 8
  }
})