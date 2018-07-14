import { connect } from 'react-redux';
import Home from '../screens/Home';
import { UserActions } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...state.userInfo,
  ...ownProps,
});

const mapDispatchToProps = {
  getInfo: UserActions.getInfo,
  clearError: UserActions.clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);