import React from 'react';
import { useFonts } from 'expo-font';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Index() {
  // ===========================================================================
  // ================================== FONTS ==================================
  // ===========================================================================
  const [fontsLoaded] = useFonts({
    'Fascinate-Regular': require('../assets/fonts/Fascinate-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ===========================================================================
  // ============================ IMAGE DIMENSIONS =============================
  // ===========================================================================
  const screenHeight = Dimensions.get('window').height;

  const stripedBackgroundAspectRatio = 689 / 516;
  const stripedBackgroundHeight = screenHeight * 0.60;
  const stripedBackgroundWidth = stripedBackgroundHeight * stripedBackgroundAspectRatio;

  const zebraAspectRatio = 357 / 379.21;
  const zebraHeight = screenHeight * 0.45;
  const zebraWidth = zebraHeight * zebraAspectRatio;


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Striped background */}
        <Image
          source={require('../assets/images/StripedBackground.png')}
          style={[styles.stripedBackground, { width: stripedBackgroundWidth, height: stripedBackgroundHeight }]}
        />

        {/* Zebra image */}
        <Image
          source={require('../assets/images/Zebra.png')}
          style={[styles.zebra, { width: zebraWidth, height: zebraHeight }]}
        />
      </View>

      {/* Text */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fafafa',
  },

  imageContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    position: 'relative',
  },

  stripedBackground: {
    resizeMode: 'cover',
    position: 'absolute',
    left: 0,
    top: 0,
  },

  zebra: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  text: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginTop: 20,
  },
});
