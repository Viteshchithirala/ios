import React from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { usePdfViewModel } from '@viewmodel/usePdfViewModel';

const PDFExam = () => {
  const { pdfUri, error } = usePdfViewModel();

  return (
    <View style={styles.container}>
      {pdfUri ? (
        <Pdf source={{ uri: pdfUri }} style={styles.pdf} />
      ) : error ? (
        <ActivityIndicator size="large" color="#F46F16" style={{flex:1,justifyContent:'center',alignItems:'center'}} />
      ) : (
        <ActivityIndicator size="large" color="#F46F16" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
});

export default PDFExam;
