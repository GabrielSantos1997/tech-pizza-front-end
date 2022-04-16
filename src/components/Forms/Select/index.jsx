import React from 'react';

import { colors } from 'assets/styles/theme';
import { Container, SelectStyles } from './styles';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isSelected ? `1px solid #00a4f033` : 'none',
    padding: '2px 0',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: colors.secondary };
  },
};
function Select({
  setFieldValue,
  options,
  handleBlur,
  value,
  placeholder,
  className,
  name,
  isMulti,
  menuPortalTarget,
  isClearable = true,
}) {
  return (
    <Container>
      <SelectStyles
        menuPortalTarget={menuPortalTarget && document.body}
        className={className}
        onChange={(v) => setFieldValue(name, v?.value || '')}
        onBlur={handleBlur}
        name={name}
        value={options ? options.filter(o => o.value == value)[0] : ''}
        noOptionsMessage={() => 'não há opções disponíveis'}
        placeholder={placeholder}
        isClearable
        styles={customStyles}
        options={options}
        isMulti={isMulti}
      />
    </Container>
  );
}

export default Select;
