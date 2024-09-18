import * as React from 'react';
import styles from './InputWithLabel.module.css';

const InputWithLabel = ({todoTitle, handleTitleChange, children}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label class={styles.label} htmlFor="todoTitle">{children}</label>
      <input 
        id="todoTitle"
        class={styles.input}
        name="title"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  )
}

export default InputWithLabel