import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import React, { PropsWithChildren } from 'react'
import Colors from '../Utilities/Constant';

type logoutProps = PropsWithChildren<{
    onLogout: () => void,
    onCancel: () => void,
}>;

const logout = ({onLogout, onCancel}: logoutProps) => {

    return (
      <View style={styles.container}>
        <View style={styles.overlay} />
          <View style={styles.popupWrapper}>
          <View style={styles.popup}>
            <View style={styles.header}>
              <View />
              <Text style={{ color: 'black' }}>Logout</Text>
                        <TouchableOpacity style={styles.closeButton}
                        onPress={onCancel}>
                <Icon name="close" size={18} color={'black'} />
              </TouchableOpacity>
            </View>
            <Text style={{ marginVertical: 24 }}>Do you want to log out?</Text>
            <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={onCancel}
                            style={styles.cancelButton}>
                <Text>Cancel</Text>
              </TouchableOpacity>
  
                        <TouchableOpacity 
                            onPress={onLogout}
              style={styles.logoutButton}>
                <Text style={{color: 'white'}}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  
export default logout

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,  
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // ensure it's on top of app
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // dimmed background
      zIndex: 0, // keep it in the background
    },
    popupWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1, // ensure it's above the overlay
    },
    popup: {
      backgroundColor: 'white',
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderRadius: 8,
      height: 170,
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    closeButton: {
        padding: 4,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8
    },
    buttons: {
      flexDirection: 'row',
      width: '100%',
    },
    cancelButton: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      marginRight: 8,
    },
    logoutButton: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      borderColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      marginLeft: 8,
      backgroundColor: Colors.yellowColor, // Replace with Colors.yellowColor
    },
  });
  