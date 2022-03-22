import { keyframes } from 'styled-components';

const Frame01Checkout = keyframes`
    from {
        opacity: 0;
        transform: scale(1.93) translate(120px, 30px);
    } to {
        opacity: 1;
        transform: scale(1.93) translate(20px, 5px);
    }
`;

const Frame01Receipt = keyframes`
    from {
        opacity: 0;
        transform: scale(1.03) translate(-4px, 20px);
    } to {
        opacity: 1;
        transform: scale(1.03) translate(60px, -50px);
    }
`;

const Frame01Authorize = keyframes`
    from {
        opacity: 0;
        transform: scale(1.87) translate(-129px, -10px);
    } to {
        opacity: 1;
        transform: scale(1.87) translate(-135px, 65px);
    }
`;

export { Frame01Checkout, Frame01Authorize, Frame01Receipt };
