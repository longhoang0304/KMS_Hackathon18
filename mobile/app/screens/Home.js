import moment from 'moment';
import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Text } from 'react-native-elements';
import LoadingDialog from '../components/Common/LoadingDialog';

import { H1, H6, WhiteText } from '../components/Text';
import WeatherImage from '../components/Common/WeatherImage';
import WallpaperBackground from '../components/Common/WallpaperBackground';
import AudioDialog from '../components/Common/AudioDialog';
// import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY'),
      time: moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss'),
      showModal: false,
    };
    this.mounted = false;
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo();
    const intervalId = setInterval(this.updateTime.bind(this), 1000);
    this.setState({ intervalId });
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

  componentWillUnmount() {
    const { intervalId } = this.state;
    if (!intervalId) {
      clearInterval(intervalId);
    }
  }

  handleDC(dcState) {
    this.setState({ dcState });
  }

  handleDryer(dryerState) {
    this.setState({ dryerState });
    this.toggleModal();
  }

  move() {
    const { navigation } = this.props;
    navigation.navigate('Map');
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

  updateTime() {
    const { mounted } = this;
    if (!mounted) return;
    this.setState({
      date: moment().tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY'),
      time: moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss'),
    });
  }

  render() {
    const {
      date,
      time,
      showModal,
    } = this.state;
    const { isLoading, fullName } = this.props;

    return (
      <WallpaperBackground>
        <AudioDialog isShow={showModal} />
        <LoadingDialog isShow={isLoading} >
          <Text style={{ fontSize: 16 }}>Gathering information</Text>
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
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingLeft: 15,
              paddingTop: 15,
              paddingRight: 15,
              flexDirection: 'row',
            }}
          >
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <WeatherImage />
              <WhiteText style={{ fontSize: 18 }}>{date}</WhiteText>
              <WhiteText style={{ fontSize: 24, fontWeight: 'bold' }}>{time}</WhiteText>
            </View>
          </View>
          <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              paddingBottom: 15,
            }}>
              <Button
                buttonStyle={{
                  backgroundColor: 'rgba(0, 255, 187, 0.6)',
                  marginHorizontal: 0,
                  marginVertical: 0,
                }}
                rounded={true}
                title='Open Voice Dialog'
                onPress={() => this.toggleModal()}
              />
            </View>
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