import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../Utilities/Constant';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.lightSubtitle,
    flex: 0.8
  },
});

export default Divider;
