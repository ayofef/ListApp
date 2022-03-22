import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { ButtonRounded } from '../../../atoms';
import { FlexContainer } from '../../../atoms/flex/FlexContainer';

export const StyledUpload = styled(FlexContainer)`
  color: #787f88;
  width: ${({ titles }) => (titles === 'logo' ? '192px' : '80px')};

  label {
    display: inline-block;
    transition: all 0.3s ease-out;

    input[type='file'] {
      display: none;
    }
  }

  input[type='checkbox'] {
    position: relative;
    z-index: 100;
    opacity: 0 !important;
    transform: scale(1.2);
    margin-top: 5px;
    cursor: pointer;

    & ~ svg {
      position: absolute;
      display: block;
      top: 3px;
      right: 0;
      transition: all 0.2s ease-out;
    }
    &:checked ~ svg {
      path {
        fill: #4e40ef;
      }
    }

    &:checked ~ .Specs {
      opacity: 1;
      visibility: visible;
    }
  }
  .Specs {
    opacity: 0;
    visibility: hidden;
    transition: all 200ms cubic-bezier(0, 0.84, 0.61, 1.01);
  }
`;
const setHeight = ({ titles, image }) => {
  if (titles === 'logo' && !image) {
    return '192px';
  }
  if (titles === 'favicon' && !image) {
    return '80px';
  }
  return 'auto;';
};

export const StyledWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: ${({ titles, image }) => setHeight(titles, image)};
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;

  img {
    width: 100%;
  }
`;

const StyledDropZoneHeight = (titles, modal) => {
  if (titles === 'logo' && !modal) {
    return '192px';
  }
  if (titles === 'logo' && modal) {
    return '192px';
  }
  if (titles === 'favicon' && !modal) {
    return '80px';
  }
  if (titles === 'favicon' && modal) {
    return '192px';
  }
  return 'auto';
};

export const StyledDropZone = styled.div`
  background-color: #f5f6f7;
  border-radius: 8px;
  width: 100%;
  height: ${({ titles, modal }) => StyledDropZoneHeight(titles, modal)};
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ::after {
    content: '';
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f6f7;
    opacity: ${({ dragging }) => (dragging ? 1 : 0)};
    transition: all 0.3s ease-out;
  }
`;

export const StyledButton = withStyles({
  root: {
    marginTop: '16px',
    backgroundColor: 'rgba(0,0,0, 0)',
    borderColor: '#c1c5cb',
    width: ({ modal }) => (modal ? '90%' : '150px'),
    transform: ({ modal, favicon }) => (!modal && favicon ? 'translateX(26px)' : 'translateX(0)'),
    '&:hover': {
      backgroundColor: 'rgba(0,0,0, 0)',
      color: '#4e40ef',
      '& svg': {
        '& path': {
          fill: '#4e40ef',
        },
      },
    },

    '& svg': {
      width: '14.7px',
      marginRight: '10px',
    },
  },
})(ButtonRounded);
