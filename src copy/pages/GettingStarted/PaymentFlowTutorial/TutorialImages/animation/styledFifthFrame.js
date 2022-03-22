import { keyframes } from 'styled-components';

const Frame05Checkout = keyframes`
    from {
        opacity: 1;
        transform: scale(1.93) translate(120px, -100px);
    } to {
        opacity: 0;
        transform: scale(2.7) translate(70px, 5px);
    }
`;

const Frame05Receipt = keyframes`
    from {
        opacity: 1;
        transform: scale(1.03) translate(-4px, 140px);
    } to {
        opacity: 0;
        transform: scale(1.03) translate(60px, -50px);
    }
`;

const Frame05Authorize = keyframes`
    from {
        opacity: 1;
        transform: scale(1.87) translate(-129px, -10px);
    } to {
        opacity: 0;
        transform: scale(1.87) translate(-135px, 65px);
    }
`;

export { Frame05Checkout, Frame05Authorize, Frame05Receipt };
