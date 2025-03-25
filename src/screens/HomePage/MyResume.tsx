import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '@context/Authcontext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import { usePdf } from '../../context/ResumeContext';
import PDFExam from './Reusableresume';
import Share from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const PDFExample = () => {
  const userid = useAuth();
  const { setPdfUri, pdfUri, refreshPdf } = usePdf();

  useEffect(() => {
    if (userid.userId) {
      refreshPdf(); // Fetch PDF when component mounts
    }
  }, [userid.userId]);

  const downloadAndShareFile = async () => {
    if (!pdfUri || typeof pdfUri !== 'string') {
      Toast.show({
        type: 'error',
        text1: '',
        text2: 'Invalid PDF file.',
        position: 'bottom',
        visibilityTime: 5000,
        text2Style: { fontSize: 14 },
      });
      return;
    }

    const fileName = `Resume_${new Date().getTime()}.pdf`;
    const downloadPath = `${RNFS.DocumentDirectoryPath}/${fileName}`; // iOS-safe storage

    console.log('PDF URI:', pdfUri);
    console.log('Download Path:', downloadPath);

    try {
      if (pdfUri.startsWith('data:application/pdf;base64,')) {
        const base64Data = pdfUri.replace('data:application/pdf;base64,', '');
        await RNFS.writeFile(downloadPath, base64Data, 'base64');
      } else if (pdfUri.startsWith('http')) {
        const download = RNFS.downloadFile({
          fromUrl: pdfUri,
          toFile: downloadPath,
        });
        await download.promise;
      } else {
        throw new Error('Invalid PDF URI format');
      }

      // Share the file so user can manually save it to Downloads
      await Share.open({
        url: `file://${downloadPath}`,
        type: 'application/pdf',
      });

      Toast.show({
        type: 'success',
        text1: '',
        text2: 'Resume saved successfully',
        position: 'bottom',
        visibilityTime: 5000,
        text2Style: { fontSize: 16 },
      });

    } catch (error) {
      console.error('Download Error:', error);
      Toast.show({
        type: 'error',
        text1: '',
        text2: 'Failed to save PDF file.',
        position: 'bottom',
        visibilityTime: 4000,
        text2Style: { fontSize: 16 },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Resume</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.pdf}>
          <PDFExam />
          {pdfUri && (
            <TouchableOpacity onPress={downloadAndShareFile} style={styles.downloadButton}>
              <AntDesign name="download" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Your styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingRight: 1.5,
  },
  pdf: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 58,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#495057',
    lineHeight: 25,
    marginLeft: 15,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 50,
    marginRight: 1,
  },
});

export default PDFExample;
