// LogoutModal.tsx
import React, { useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import UserContext from '@context/UserContext';

import { usePdf } from '../../context/ResumeContext';
interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
const { width,height } = Dimensions.get('window');
const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onCancel, onConfirm }) => {

  //reset the total data while logout to ensure no credentilas left in authcontext
  const {reset} = useContext(UserContext)
  const { setPdfUri } = usePdf(); // Get setPdfUri to clear the PDF


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Are you sure you want to{"\n"}logout?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={()=>{onCancel();reset();}} style={[styles.modalButton, styles.cancelButton]}>
              <Text style={[styles.buttonText, { color: '#F46F16' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{onConfirm() ;setPdfUri(null);}} style={[styles.modalButton]}>
              <LinearGradient
                colors={['#F46F16', '#F8A44C']}
                style={styles.gradientButton}
              >
                <Text style={[styles.buttonText, { color: '#FFF' }]}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    marginTop:10,
    marginBottom: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: '#0D0D0D'

  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: height * 0.07,
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,

    
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#F46F16',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: height * 0.05,
  },
  gradientButton: {
    width: '105%',
    height: height * 0.05, // Increase height to accommodate padding
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

  },
  buttonText: {
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
export default LogoutModal;