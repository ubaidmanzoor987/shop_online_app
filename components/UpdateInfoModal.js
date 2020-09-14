import React from 'react';
import { BlurView } from 'expo-blur';
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const MyModal = ({ children, visible, onRequestClose, onPressOverlay, }) => {
  return (
     <KeyboardAwareScrollView>
     <Modal
      visible={visible}
      transparent
      animationType='none'
      onRequestClose={onRequestClose}
     >
       <TouchableWithoutFeedback onPress={onPressOverlay}>
         <BlurView
           style={{ ...StyleSheet.absoluteFill }}
           tint='dark'
           intensity={100}
         />
       </TouchableWithoutFeedback>
       <View style={styles.container}>
         {children}
       </View>
    </Modal>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});