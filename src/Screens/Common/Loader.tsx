import React, { PropsWithChildren } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

type propsType = PropsWithChildren<{
    isVisible: boolean
}>

const Loader = (props: propsType) => {
  return (
    <Modal
      transparent animationType="none"
      visible={props.isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color='white' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#00000088',
    height: 80,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Loader;
