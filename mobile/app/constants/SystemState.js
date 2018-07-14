const IDLING = 0;
const DRYING = 1;
const DRYER_STARTED = 2;
const PENDING = 3;
const UNKNOWN = 4;

const getStateName = (state) => ['IDLING', 'DRYING', 'DRYER RUNNING', 'PENDING', 'N/A'][state];

export {
  IDLING,
  DRYING,
  DRYER_STARTED,
  PENDING,
  UNKNOWN,
  getStateName,
};