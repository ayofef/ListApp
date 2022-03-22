import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { StyledNameCell } from './styled';
import DropDownMenu from '../../../components/menus/DropDownMenu';

const PeopleNameHeadCell = ({ onRequestSort }) => {
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);

  const handleDropDownClick = () => {
    setIsDropDownClicked((prev) => !prev);
  };

  const options = [
    {
      Ascending: (e) => onRequestSort(e, 'name', 'asc'),
      Descending: (e) => onRequestSort(e, 'name', 'desc'),
    },
  ];

  return (
    <div className="th-name">
      <StyledNameCell isDropDownClicked={isDropDownClicked}>
        Name
        <DropDownMenu
          options={options}
          button={<ArrowDownIcon className="arrowDownIcon" onClick={handleDropDownClick} />}
          id="sorting-row"
          width="auto"
          anchorOrigin={{
            vertical: 'bottom',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        />
      </StyledNameCell>
    </div>
  );
};

PeopleNameHeadCell.propTypes = {
  onRequestSort: PropTypes.elementType.isRequired,
};

export default PeopleNameHeadCell;
