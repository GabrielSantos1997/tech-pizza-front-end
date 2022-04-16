import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.nav`
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  &::before {
    content: '';
    position: absolute;
    display: block;
    bottom: -10px;
    ${({ length, barPosition, theme }) => css`
      left: ${(100 / length) * barPosition}%;
      width: ${100 / length}%;
      background: ${lighten(0.2, theme.colors.primary)};
      border-radius: 50px;
    `}
    height: 3px;
    transition: left 0.75s ease-out;
  }
`;

export const Button = styled.button`
  flex: 1;
  ${({ selected, theme, hidden }) =>
    selected
      ? css`
          color: ${theme.colors.secondary};
        `
      : css`
          color: #9b9b9b;
          display: ${hidden && 'none'};
        `}
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  line-height: 1rem;
  transition: color 0.5s;
`;
