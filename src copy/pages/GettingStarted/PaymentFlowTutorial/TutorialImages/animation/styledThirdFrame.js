import { keyframes } from 'styled-components';

const Frame03Checkout = keyframes`
    from {
        transform: scale(1.93) translate(120px, 30px);
    } to {
        transform: scale(2.7) translate(70px, 5px);
    }
`;

const Frame03Receipt = keyframes`
    from {
        opacity: 1;
        transform: scale(1.03) translate(-4px, 20px);
    } to {
        opacity: 0;
        transform: scale(1.03) translate(60px, -50px);
    }
`;

const Frame03Authorize = keyframes`
    from {
        opacity: 1;
        transform: scale(1.87) translate(-129px, -10px);
    } to {
        opacity: 0;
        transform: scale(1.87) translate(-135px, 65px);
    }
`;

export { Frame03Checkout, Frame03Authorize, Frame03Receipt };
