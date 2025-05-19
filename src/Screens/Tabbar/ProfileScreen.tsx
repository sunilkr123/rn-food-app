import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SectionList,
  Modal
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Utilities/Constant';
import sectionData from '../../Utilities/profileConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Common/Loader';
import { NavigationContainerProps } from '@react-navigation/native';
import { StackScreens } from '../../App';
import Logout from '../../Components/logout'

type UserProfile = {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: string,
  email: string,
  image: string
}

type profileProps = NavigationContainerProps<StackScreens, 'profile'>;

const ProfileScreen = ({navigation}: profileProps): React.JSX.Element => {
  const [profileInfo, setProfileInfo] = useState<UserProfile | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getAccessToken();
  }, [])

  const getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access-token');
      console.log(`access token is ${value}`)
      if (value != null) {
        getProfileInfo(value)
      }
    } catch (e) {
      return null;
    }
  };
  
  const clearSoredInfo = async () => {
    try {
      await AsyncStorage.removeItem('access-token')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  const logOut = async () => {
    console.log(`logOut`)
      await clearSoredInfo()
    navigation.replace('login')
  }
  const cancelPopup = () => {
    console.log(`cancelPopup`)
   setModalVisible(false)
  }

  function getProfileInfo(token: string) {
    console.log(`access token is111111111111111 ${token}`)
    let url = 'https://dummyjson.com/user/me';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    }).then(result => result.json())
      .then(jsonResponse => {
        console.log(`profile's response is ${jsonResponse}`)
        setProfileInfo(jsonResponse)
      })
    
      }
  
  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}>
        <Logout {...{onCancel: cancelPopup, onLogout: logOut}} />
      </Modal>
      
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://avatars.githubusercontent.com/u/39487428?s=400&u=4b1fbbca8ec59fde74a1de615912dd6c0d19cb0a&v=4' }} style={styles.image} />
           <TouchableOpacity style={styles.iconContainer}>
                <Icon name="camera" size={20} color="red" />
                  </TouchableOpacity>
      </View>
      <Text style={styles.nameTxt}>{`${profileInfo?.firstName} ${profileInfo?.maidenName} ${profileInfo?.lastName}`}</Text>
      <Text style={styles.emailTxt}>{profileInfo?.email}</Text>
      <View style={styles.seperatorLine}></View>
      <SectionList
        style={{paddingHorizontal: 8}}
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 24,
              backgroundColor: 'white',
              paddingVertical: 16
            }}>
              <View style={{ flexDirection: 'row'}}>
              <Icon name={item.icon} size={24} color={Colors.primaryColor} />
                <Text style={{paddingHorizontal: 14, fontSize: 16, fontWeight: '500'}}>{item.title}</Text>
                </View>
              <MaterialIcons name='arrow-forward-ios' size={24} color={Colors.primaryColor} />
          </View>
          )}
         renderSectionHeader={({section: {title}}) => (
          <Text style={styles.profileTitle}>{title}</Text>
        )}
      />
        <TouchableOpacity
          onPress={async () => {
            setModalVisible(true)
          }}
          style={styles.logoutClick}>
        <View style = {styles.logoutContainer}>
          <MaterialIcons name="logout" size={32} color="red" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
    <Loader {...{isVisible: profileInfo === null}} />
    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    position: 'relative'
},
    iconContainer: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 8,
    borderRadius: 16,
    zIndex: 1,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 65,
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'cyan'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40
  },
  nameTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryColor,
    marginTop: 40
  },
  emailTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#878787',
    marginTop: 10
  },
  seperatorLine: {
    height: 2,
    backgroundColor: '#E8E6E6',
    marginHorizontal: 10,
    width: '85%',
    marginTop: 20,
    marginBottom: 20
  },
  logoutContainer:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
    paddingLeft: 10
  },
  logoutClick: {
        borderWidth: 1,
        height: 60,
        borderRadius: 30,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
  },
  profileTitle: {
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: '400'
  }
})