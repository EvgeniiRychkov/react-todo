import * as React from 'react';
import styles from './InputWithLabel.module.css';
import PropTypes from 'prop-types'

const InputWithLabel = ({todoTitle, handleTitleChange, children}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label className={styles.label} htmlFor="todoTitle">{children}</label>
      <input 
        id="todoTitle"
        className={styles.input}
        name="title"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  )
}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default InputWithLabel