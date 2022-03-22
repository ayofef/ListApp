// import { useField } from 'formik';
// import React, { useMemo } from 'react';
// import zxcvbn from 'zxcvbn';
// import { string } from 'prop-types';
// import omit from 'lodash/omit';
//
// import PasswordUsageCheck from './PasswordUsageCheck';
// import { progressBarValues } from '../../../utils/helpers';
// import THEME from '../../../constants/theme';
// import { BorderLinearProgress, P12, FlexContainer } from '../../atoms';
// import { MESSAGES } from '../../../utils/validators/passwordValidator';
// import { RequirementsItemCover, RequirementsListCover, StyledCircle } from '../../common/PasswordField/styled';
//
// const messages = Object.values(omit(MESSAGES, ['required', 'emailEqual']));
//
// const ProgressSpy = ({ fieldName }) => {
//   const [{ value }, { touched, error }] = useField(fieldName);
//   const scope = useMemo(() => zxcvbn(value).score, [value]);
//   const { color, text } = useMemo(() => progressBarValues[scope], [scope]);
//
//   return (
//     <>
//       <RequirementsListCover>
//         {messages.map((message) => {
//           const isValid = touched && !error?.includes(message);
//
//           return (
//             <RequirementsItemCover key={message}>
//               <StyledCircle isValid={isValid} />
//
//               <P12 color={isValid ? THEME.primaryColors.blue : THEME.primaryColors.black}>{message}</P12>
//             </RequirementsItemCover>
//           );
//         })}
//       </RequirementsListCover>
//
//       <FlexContainer inline width="100%">
//         <BorderLinearProgress backgroundColor={color} variant="determinate" color="secondary" value={25 * scope} />
//
//         <P12 margin="0 0 0 30px" color={color}>
//           {text}
//         </P12>
//       </FlexContainer>
//       <PasswordUsageCheck fieldName={fieldName} />
//     </>
//   );
// };
//
// ProgressSpy.propTypes = {
//   fieldName: string.isRequired,
// };
//
// export default ProgressSpy;
