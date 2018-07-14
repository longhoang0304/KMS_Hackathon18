import React from 'react';
import PropTypes from 'prop-types';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import RemoteControl from '../../screens/RemoteControl';

const DryerSettingDialog = (props) => {
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
      <RemoteControl />
    </PopupDialog>
  );
};

DryerSettingDialog.propTypes = {
  isShow: PropTypes.bool,
  minute: PropTypes.number,
  state: PropTypes.number,
  toggleDialog: PropTypes.func,
  handleDryer: PropTypes.func,
  onChange: PropTypes.func,
};


export default DryerSettingDialog;