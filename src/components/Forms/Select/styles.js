import styled from 'styled-components';
import Select from 'react-select';
import tw from 'twin.macro';

export const Container = styled.div`
  width: 100%;
  input:focus {
    border: none;
    box-shadow: none;
  }
`;

export const SelectStyles = styled(Select)`
  ${tw`shadow`}
`;
