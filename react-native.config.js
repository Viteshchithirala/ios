// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Disable auto-linking for iOS
      },
    },
  },
  assets: ['./src/assests/fonts'], // Keep your custom fonts
};