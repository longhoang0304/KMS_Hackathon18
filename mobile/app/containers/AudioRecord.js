import { connect } from 'react-redux';
import AudioRecord from '../components/Common/AudioRecord';
import { SysActions } from '../actions';

const mapDispatchToProps = {
  sendAnswer: SysActions.sendAnswer,
};

export default connect(null, mapDispatchToProps)(AudioRecord);