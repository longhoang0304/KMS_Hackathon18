import React from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';

const Help = () => {
  const titleStyle = [styles.headerText];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewBox}>
      <ImageBackground style={styles.helpImg} source={require('../assets/images/helpdesk.jpg')}>
        <View style={[styles.helpHeader, styles.flexBox]}>
            <Text h1 style={titleStyle}>
                INFORMATION
            </Text>
        </View>
      </ImageBackground>
      <View>
        <Text>
            Text
        </Text>
      </View>
    </ScrollView>
  );
};

export default Help;