import moment from 'moment';
import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-elements';

import LoadingDialog from '../components/Common/LoadingDialog';
import { H1, H6, WhiteText } from '../components/Text';
import WallpaperBackground from '../components/Common/WallpaperBackground';
// import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  componentDidMount() {
    const { getInfo, fetchScore, fetMaxScore, navigation } = this.props;
    const interviewId = navigation.getParam('interviewId');
    getInfo();
    fetchScore();
    fetMaxScore(interviewId);
    this.mounted = true;
  }

  componentDidUpdate() {
    const { errorMsg, getInfo, clearError } = this.props;
    clearError();
    if (errorMsg) {
      Alert.alert(
        'Error',
        'Cannot gather information',
        [
          {
            text: 'Try again', onPress: () => getInfo(),
          },
          {
            text: 'Cancel', onPress: () => null,
          },
        ],
      );
    }
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  static genGreeting() {
    const hour = moment().tz('Asia/Ho_Chi_Minh').hour();
    const greetngs = [
      'Good morning',
      'Have a great day',
      'Good afternoon',
      'Good evening',
      'Good night',
    ];
    if (hour >= 4 && hour <= 8) return greetngs[0];
    if (hour >= 9 && hour <= 12) return greetngs[1];
    if (hour >= 13 && hour <= 17) return greetngs[2];
    if (hour >= 18 && hour <= 20) return greetngs[3];
    return greetngs[4];
  }

  render() {
    const { isLoading, fullName, totalScore, maxScore } = this.props;

    return (
      <WallpaperBackground>
        <LoadingDialog isShow={isLoading} >
          <Text style={{ fontSize: 16 }}>Checking your score</Text>
        </LoadingDialog>
        {/* =============== END POPUP DIALOG ================= */}
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <WhiteText><Text>Your score:</Text></WhiteText>
            <WhiteText><H1>{totalScore}</H1>/<H6>{maxScore}</H6></WhiteText>
          </View>
          <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingBottom: 15,
                  paddingRight: 15,
                }}
              onPress={() => console.log('Forward to profile')}
            >
              <WhiteText style={{
                fontSize: 18,
              }}>
                {`${Home.genGreeting()},`}
              </WhiteText>
              <H6>
                <WhiteText>{fullName}</WhiteText>
              </H6>
            </TouchableOpacity>
          </View>
        </View>
      </WallpaperBackground>
    );
  }
}

export default Home;