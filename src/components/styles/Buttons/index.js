import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Tag = styled.button`
  ${({ color, isSelected }) =>
    isSelected
      ? css`
          background-color: ${color};
          color: ${darken(0.4, color)};
        `
      : css`
          border: 1px solid ${color};
          &:hover {
            background-color: ${darken(0.07, color)};
          }
        `}
  &:disabled {
    border: none;
    &:hover {
      cursor: default;
    }
  }

  white-space: nowrap;
  text-transform: uppercase;
  border-radius: 9999px;
  font-weight: bold;
  transition: background 0.6s;
`;
