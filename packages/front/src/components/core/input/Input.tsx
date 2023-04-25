import React, { useState } from 'react';
import '../../../theme/components/core/input.scss';

interface Input {
  onInput?: () => void
  onChange?: () => void
  type?: string
  id?: string
  accept?: string
  multiple?: boolean
  placeholder?: string
  required?: boolean
}

const Input : React.FC<Input> = (props) => {
  const {
    onInput,
    onChange,
    type,
    id,
    accept,
    placeholder,
    multiple,
    required
  } = props;

  return (
    <input
      onInput={onInput}
      onChange={onChange}
      className='input'
      type={type}
      id={id}
      accept={accept}
      multiple={multiple}
      placeholder={placeholder}
      required={required}
      {... props}
    />
  );
}

export default Input;
