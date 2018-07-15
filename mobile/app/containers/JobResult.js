import { connect } from 'react-redux';
import JobResult from '../screens/JobResult';
import { SysActions } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...state.searchResult,
  ...ownProps,
});

const mapDispatchToProps = {
  fetchResult: SysActions.fetchResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobResult);