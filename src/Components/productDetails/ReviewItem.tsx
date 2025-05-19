import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { PropsWithChildren } from 'react'
type Reviews = PropsWithChildren<
    {
        reviewItems: Review
    }>;

const ReviewItem = (props: Reviews) => {
  return (<View style={{ backgroundColor: 'white', marginVertical: 5, padding: 10, borderRadius: 8 , marginHorizontal: 16}}>
              <Text style={{ fontSize: 14, fontWeight: '500' }}>{props.reviewItems.reviewerName}</Text>
              <Text style={{ fontSize: 11, fontWeight: '400', marginVertical: 4 }}>{props.reviewItems.comment}</Text>
         <View style={styles.imageWithTxt}>
           <Image
            style={styles.infoIcon}
            source={require('../../assets/icons/ratting.png')}/>
            <Text style={styles.ratting}>{props.reviewItems.rating}</Text>
              </View>
      </View>)
}

export default ReviewItem
const styles = StyleSheet.create({
    imageWithTxt: {flexDirection: 'row', justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ratting: { fontSize: 11, marginLeft: 8 },
    infoIcon: { height: 12, width: 12 },
})