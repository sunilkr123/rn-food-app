import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/FontAwesome6'
import Search from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'

interface RecentChat{
  id: string,
  profileUrl: string,
  name: string,
  time: string,
  readStatus: boolean,
  lastMessage: string
}

const RecentChats = (): React.JSX.Element => {
  const recentChatItems: RecentChat[] = [
    {
      id: '1',
      profileUrl: 'https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/images/panoramic/steve-jobs-inc-76857994_545252_ukzxx6.jpg',
      name: 'Steve Jobs',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'JBL Tour One M3:release in April 2025'
    },
        {
      id: '2',
      profileUrl: 'https://www.asksportsinfo.com/wp-content/uploads/2000/09/abhishek-sharma-india-cricketer.webp',
      name: 'Abbishek Ahirvar',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Your Order Just Arrived!'
    },
            {
      id: '3',
      profileUrl: 'https://pbs.twimg.com/profile_images/985630371210412032/Y7kTocYT_400x400.jpg',
      name: 'Chayan Surana',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Your Order Just Arrived!'
    },
                {
      id: '4',
      profileUrl: 'https://img.etimg.com/thumb/msid-117889805,width-650,height-488,imgsize-124750,resizemode-75/microsoft-founder-bill-gates-explores-the-making-of-his-internal-operating-system-in-new-memoir.jpg',
      name: 'Bill Gates',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Born and raised in Seattle, Washington'
    },
                    {
      id: '5',
      profileUrl: 'https://avatars.githubusercontent.com/u/39487428?s=400&u=4b1fbbca8ec59fde74a1de615912dd6c0d19cb0a&v=4',
      name: 'Sujat Sharma',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Your Order Just Arrived!'
    },
                                   {
      id: '6',
      profileUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQFrmDuWUxQoMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715645354619?e=2147483647&v=beta&t=dkLl7DSveuVd5sakuJ-nk0akumosrA4bx8UCOytIsh0',
      name: 'Sundar Pichai',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Hey, Your Order Just Arrived!'
    },
                    {
      id: '7',
      profileUrl: 'https://avatars.githubusercontent.com/u/39487428?s=400&u=4b1fbbca8ec59fde74a1de615912dd6c0d19cb0a&v=4',
      name: 'Sujat Sharma',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Your Order Just Arrived!'
    },
                                   {
      id: '8',
      profileUrl: 'https://avatars.githubusercontent.com/u/39487428?s=400&u=4b1fbbca8ec59fde74a1de615912dd6c0d19cb0a&v=4',
      name: 'Bhanu Pratap Signh',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Your Order Just Arrived!'
    },
                    {
      id: '9',
      profileUrl: 'https://avatars.githubusercontent.com/u/39487428?s=400&u=4b1fbbca8ec59fde74a1de615912dd6c0d19cb0a&v=4',
      name: 'Sujat Sharma',
      time: '10: 30 PM',
      readStatus: false,
      lastMessage: 'Your Order Just Arrived!'
  }
  ]
  const [searchTxt, setSearchTxt] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
    <View style={styles.innerContainer}>
        <View style={styles.userHeader}>
          <Image source={{
            uri: 'https://avatars.githubusercontent.com/u/39487428?s=400&u=4b1fbbca8ec59fde74a1de615912dd6c0d19cb0a&v=4'
          }} style={styles.headerProfile} />
          <View>
            <Text style={styles.txtWelcome}>Welcome.</Text>
            <Text style={styles.txtName}>Alexa John</Text>
        </View>
      </View>
        <View style={styles.searchContainer}>
          <Search name='search' size={24} color={'gray'} />
          <TextInput style={{ paddingHorizontal: 8 }}
            placeholder='Search'
            onChangeText={(text) => {setSearchTxt(text)}}/>
        </View>
        <Text style={styles.txtChat}>Chat</Text>
        <FlatList
          data={['All', 'Unread', 'Group', 'Private']}
          style={{marginBottom: 14}}
          keyExtractor={(item) => item}
          renderItem={(DataItem) =>
            <TouchableOpacity onPress={ () => {
                setSelectedIndex(DataItem.index)
              }}>
            <View style={{
              backgroundColor: selectedIndex == DataItem.index ? '#D5F3D1' : '#F2F2F2' ,
              paddingHorizontal: 10,
              marginHorizontal: DataItem.index  == 0 ? 0 : 8,
                paddingBottom: 8,
              paddingTop: 6,
              borderRadius: 4
            }}>
            <Text style={{color: selectedIndex == DataItem.index ? '#53B337' : '#8B8B8B'}}>{DataItem.item}</Text>
              </View>
              </TouchableOpacity>
          }
          horizontal={true}
        />
        <FlatList
        showsVerticalScrollIndicator = {false}
        data={recentChatItems}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (<View style={styles.chatItems}>
          <View style={{height: 45, width: 45, alignItems: 'flex-end'}}>
          <Image source={{ uri: itemData.item.profileUrl }} style={styles.chatProfile} />
            {itemData.index % 2 == 0 ? <View style={styles.online}></View> : null}
          </View>
        
          <View style={{marginHorizontal: 10}}>
            <Text style={styles.chatName}>{itemData.item.name}</Text>
             <Text style={{fontSize: 10}}>{itemData.item.lastMessage}</Text>
          </View>
          <View style={{position: 'absolute', right: 0}}>  
            <Text style={styles.txtTime}>{itemData.item.time}</Text>
            <Ionicons name='check-double' size={16} color={'#FE8C00'}/>
          </View>
        </View>)}
      />
      </View>
      </SafeAreaView>
  )
}

export default RecentChats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 24,
  },
  userHeader:
  {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 14
  },
  headerProfile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10
  }, txtWelcome: {
    color: '#717171',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5
  },
  txtName: {
    color: '#060606',
    fontSize: 16
  },
  searchContainer: {
    height: 45,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#74CD9B',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  txtChat: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14
  },
  chatItems: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 10,
  },
  chatProfile: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#74CD9B'
  },
  online: {
    backgroundColor: '#58C039',
    height: 14,
    width: 14,
    borderRadius: 7,
    position: 'relative',
    bottom: 15
  },
  chatName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8
  },
  txtTime: {
    marginBottom: 8,
    fontSize: 11,
    fontWeight: '400'
  }
})