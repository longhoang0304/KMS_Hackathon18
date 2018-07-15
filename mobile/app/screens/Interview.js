import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import _ from 'lodash';
import { Speech } from 'expo';
import WallpaperBackground from '../components/Common/WallpaperBackground';
import AudioDialog from '../components/Common/AudioDialog';
import LoadingDialog from '../components/Common/LoadingDialog';

class Interview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      questions: [],
      currentQuestion: -1,
    };
  }

  componentDidUpdate() {
    const { questions, navigation } = this.props;
    const sQuestions = this.state.questions;
    console.log(this.state.showModal);
    const options = {
      language: 'vi',
      pitch: 1,
      rate: 1.0,
    };
    if (!_.isEqual(questions, sQuestions)) {
      if (questions.length === 0) return;
      this.setState({ questions, currentQuestion: 0 });
      Speech.speak(`Có ${questions.length} câu hỏi đang chờ bạn!`, options);
    } else {
      const { currentQuestion, showModal } = this.state;
      if (currentQuestion < 0) {
        return;
      }
      if (showModal) return;
      if (currentQuestion >= questions.length) {
        Speech.speak('Chúc mừng bạn đã hoàn thành bài phỏng vấn!', options);
        const interviewId = navigation.getParam('interviewId');
        navigation.navigate('Home', { interviewId });
        return;
      }
      Speech.speak(questions[currentQuestion].content, options);
      this.setState({ currentQuestion: currentQuestion + 1, showModal: true });
    }
  }

  componentDidMount() {
    const { fetchQuestion } = this.props;
    fetchQuestion();
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    const { isLoading } = this.props;

    return (
      <WallpaperBackground>
        <LoadingDialog isShow={isLoading} >
          <Text style={{ fontSize: 16 }}>Gathering questions</Text>
        </LoadingDialog>
        <AudioDialog
          isShow={showModal}
          closeModal={this.closeModal}
        />
        <View>
        </View>
      </WallpaperBackground>
    );
  }
}

export default Interview;