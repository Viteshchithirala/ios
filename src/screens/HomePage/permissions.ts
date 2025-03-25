import { PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestStoragePermission = async () => {
  if (Platform.OS === 'ios') {
    // iOS does not require storage permissions for app-specific directories
    return true;
  }

  try {
    if (Number(Platform.Version) >= 33) {
      // Android 13+ (API 33+): Request READ_MEDIA_IMAGES and READ_MEDIA_VIDEO
      const readMediaImages = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );
      const readMediaVideos = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      );
      return (
        readMediaImages === PermissionsAndroid.RESULTS.GRANTED &&
        readMediaVideos === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      // Android 12 and below: Request WRITE_EXTERNAL_STORAGE
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
};