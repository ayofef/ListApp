import { keyframes } from 'styled-components';

const Frame04Checkout = keyframes`
    from {
        transform: scale(2.7) translate(70px, 5px);
    } to {
        transform: scale(1.93) translate(120px, -100px);
    }
`;

const Frame04Receipt = keyframes`
    from {
        opacity: 0;
        transform: scale(1.03) translate(60px, -50px);
    } to {
        opacity: 1;
        transform: scale(1.03) translate(-4px, 140px);
    }
`;

const Frame04Authorize = keyframes`
    from {
        opacity: 0;
        transform: scale(1.87) translate(-135px, 65px);
    } to {
        opacity: 1;
        transform: scale(1.87) translate(-129px, -10px);
    }
`;

export { Frame04Checkout, Frame04Authorize, Frame04Receipt };
