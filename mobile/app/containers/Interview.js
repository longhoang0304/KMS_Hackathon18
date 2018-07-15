import { connect } from 'react-redux';
import Interview from '../screens/Interview';
import { SysActions } from '../actions';

const mapStateToProps = (states, ownProps) => ({
  ...states.questions,
  ...ownProps,
});

const mapDispatchToProps = {
  fetchQuestion: SysActions.fetchQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interview);