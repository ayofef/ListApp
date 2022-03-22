import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { getAutomationTemplateIcon } from '../../../../../../../constants/getAutomationTemplateIcon';
import { StyledCategoryIcons } from './styled';
import CircleWithIcon from '../../../../../../../components/atoms/CircleWithIcon/CircleWithIcon';

const Categories = ({ categories }) => {
  const icons = getAutomationTemplateIcon(categories) || [];

  return (
    <Box mr="44px">
      <Box display="flex" alignItems="center" mb="10px">
        <StyledCategoryIcons>
          {icons.map(({ Icon, color, key }, index) => (
            <CircleWithIcon key={key} array={icons} index={index}>
              {Icon && <Icon size={20} color={color} />}
            </CircleWithIcon>
          ))}
        </StyledCategoryIcons>
      </Box>
    </Box>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Categories;
