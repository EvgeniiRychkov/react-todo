import * as React from 'react';
import styles from './InputWithLabel.module.css';
import PropTypes from 'prop-types'

const InputWithLabel = ({title, handleTitleChange, inputID, children}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <div className="col-auto">
        <label htmlFor={inputID}>{children}</label>
      </div>
      <div className="col">
        <input 
          id={inputID}
          className={styles.inputTitle}
          name="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          ref={inputRef}
        />
      </div>
    </>
  )
}

InputWithLabel.propTypes = {
  title: PropTypes.string,
  inputID: PropTypes.string,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default InputWithLabel