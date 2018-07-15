import { connect } from 'react-redux';
import Home from '../screens/Home';
import { UserActions, SysActions } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...state.userInfo,
  ...state.score,
  ...ownProps,
});

const mapDispatchToProps = {
  getInfo: UserActions.getInfo,
  clearError: UserActions.clearError,
  fetchScore: SysActions.fetchScore,
  fetMaxScore: SysActions.fetchMaxScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);