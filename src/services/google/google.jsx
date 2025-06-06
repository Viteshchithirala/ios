import { useState, useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'; 
import { useAuth } from '@context/Authcontext';  
import { showToast } from '../login/ToastService';


const useGoogleSignIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const {Glogin} = useAuth();
  
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:'257212616645-6o230q4dmtk587hjtmo00efqal9407is.apps.googleusercontent.com',
      webClientId:'257212616645-9use0krm57nbm7cl55718rvs3bl72fco.apps.googleusercontent.com'
    })
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log('User Info:', user);
      setUserInfo(user);
      setIsSignedIn(true); 
      const email = user?.data.user?.email;
      console.log('Email:', email);
      await Glogin(email);
      showToast('success','Login Successful')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services are not available');
      } else {
        console.error('Google Sign-In Error:', error);
      }
    }
  };
  
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('User signed out');
      setIsSignedIn(false);
      setUserInfo(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    userInfo,
    isSignedIn,
    signIn,
    signOut,
  
  };
};

export default useGoogleSignIn;