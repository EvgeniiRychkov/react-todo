import * as React from 'react';

const InputWithLabel = ({todoTitle, handleTitleChange, children}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input 
        id="todoTitle"
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