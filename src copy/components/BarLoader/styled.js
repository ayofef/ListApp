import styled, { css, keyframes } from 'styled-components';

const changeOpacity = keyframes`
    0% {
        opacity: 0.25;
    }
    50%{
        opacity: 1;
        
    }
    70% {
        opacity: 0.5;

    }
    100%{
        opacity: 0.25;
        
    }
`;

const barOpacity = css`
  animation: ${changeOpacity} ease-out infinite;
`;

export const StyledLoadingBar = styled.div`
    width: 100%;
    height: ${({ height }) => height || '6px'};
    margin-bottom: 8px;
    background-color: #EDEFF2;
    border-radius: 8px;
    opacity: 0.25;
    ${barOpacity}
    animation-delay: ${({ animationDelay }) => animationDelay};
    animation-duration: ${({ animationDuration }) => animationDuration};
`;
