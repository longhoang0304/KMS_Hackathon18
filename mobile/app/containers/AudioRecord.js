import { connect } from 'react-redux';
import AudioRecord from '../components/Common/AudioRecord';
import { SysActions } from '../actions';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = {
  sendAnswer: SysActions.sendAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecord);