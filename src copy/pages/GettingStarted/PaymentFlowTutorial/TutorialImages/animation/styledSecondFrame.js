import { keyframes } from 'styled-components';

const Frame02Checkout = keyframes`
    from {
        transform: scale(1.93) translate(20px, 5px);
    } to {
        transform: scale(1.93) translate(120px, 30px);
    }
`;

const Frame02Receipt = keyframes`
    from {
        transform: scale(1.03) translate(60px, -50px);
    } to {
        transform: scale(1.03) translate(-4px, 20px);
    }
`;

const Frame02Authorize = keyframes`
    from {
        transform: scale(1.87) translate(-135px, 65px);
    } to {
        transform: scale(1.87) translate(-129px, -10px);
    }
`;

export { Frame02Checkout, Frame02Authorize, Frame02Receipt };
