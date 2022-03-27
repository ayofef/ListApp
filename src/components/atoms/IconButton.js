import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import THEME from '../../constants/theme';

const StyledButton = styled.button`
  background-color: ${({ $isActive }) => ($isActive ? THEME.primaryColors.primaryLight : THEME.greyColors.grey1)};
  cursor: pointer;
  transition: all 0.3s ease-out;

  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: center;

  border: ${({ $border }) => $border};
  outline: none;
  border-radius: 4px;

  padding: 0;
  margin: 0;

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 600;

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? THEME.primaryColors.primaryLight2 : THEME.primaryColors.primaryLight};
  }

  & .add-icon {
    font-size: ${({ $iconSize }) => $iconSize};
    color: #000;
    transform: translateY(2px);
  }

  & .button-label {
    color: #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 8px;
  }
`;

function IconButton({
  onClick,
  width,
  height,
  taskId,
  label,
  disabled,
  CustomIcon,
  showIcon,
  justifyContent,
  fontSize,
  iconSize,
  isActive,
  border,
}) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      $height={height}
      $width={width}
      $justifyContent={justifyContent}
      $fontSize={fontSize}
      $iconSize={iconSize}
      disabled={disabled}
      $isActive={isActive}
      $border={border}
      {...(taskId && { 'data-taskid': taskId })}
    >
      {showIcon && (
        <div className="add-icon">
          {CustomIcon ? (
            <CustomIcon fontSize="inherit" color="inherit" />
          ) : (
            <AddIcon fontSize="inherit" color="inherit" />
          )}
        </div>
      )}
      {label && <span className="button-label">{label}</span>}
    </StyledButton>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  taskId: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  CustomIcon: PropTypes.elementType,
  showIcon: PropTypes.bool,
  justifyContent: PropTypes.string,
  fontSize: PropTypes.string,
  iconSize: PropTypes.string,
  isActive: PropTypes.bool,
  border: PropTypes.string,
};
IconButton.defaultProps = {
  width: '40px',
  height: '32px',
  taskId: undefined,
  label: undefined,
  disabled: false,
  CustomIcon: undefined,
  showIcon: true,
  justifyContent: 'center',
  fontSize: '14px',
  iconSize: '20px',
  isActive: false,
  border: 'none',
};
export default IconButton;
