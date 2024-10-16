import PropTypes from 'prop-types'

const TimeFormatter = ({ seconds }) => {
  const formatTime = (seconds) => {
    if (seconds === undefined || seconds === null || seconds == 0 || Number.isNaN(seconds)) { 
      return '00:00:00';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      {formatTime(seconds)}
    </>
  );
};

TimeFormatter.propTypes = {
  seconds: PropTypes.number,
};

export default TimeFormatter;