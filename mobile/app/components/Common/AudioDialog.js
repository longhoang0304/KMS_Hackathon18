import React from 'react';
import PropTypes from 'prop-types';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import AudioRecord from '../../containers/AudioRecord';

const AudioDialog = (props) => {
  const {
    isShow,
  } = props;

  return (
    <PopupDialog
      dialogTitle={<DialogTitle title='Audio' />}
      ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      show={isShow}
      width={0.85}
      height={450}
      dismissOnTouchOutside={true}
    >
      <AudioRecord />
    </PopupDialog>
  );
};

AudioDialog.propTypes = {
  isShow: PropTypes.bool,
  minute: PropTypes.number,
  state: PropTypes.number,
  toggleDialog: PropTypes.func,
  handleDryer: PropTypes.func,
  onChange: PropTypes.func,
};


export default AudioDialog;