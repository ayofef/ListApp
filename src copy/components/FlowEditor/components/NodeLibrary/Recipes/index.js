import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import RecipeItem from './RecipeItem';
import { StyledRecipesWrapper } from './styled';
import RecipeFilter from './RecipeFilter';
import RecipeListLoadingState from './RecipeListLoadingState';
import { useGetAutomationTemplates } from '../../../../../pages/FlowDetailsPage/hooks/useGetAutomationTemplates';
import ListEmptyState from '../../../../ListEmptyState';

const EMPTY_STATE_TITLE = 'There are currently no recipes.';

const Recipes = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { loading, templates } = useGetAutomationTemplates();

  const filteredRecipes = isEmpty(selectedCategories)
    ? templates
    : templates.filter((recipe) => recipe.categories.some((category) => selectedCategories.includes(category)));

  return (
    <>
      <RecipeFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        loading={loading}
        recipes={templates}
      />

      <StyledRecipesWrapper>
        {loading && <RecipeListLoadingState />}
        {!loading && isEmpty(filteredRecipes) && (
          <div>
            <ListEmptyState title={EMPTY_STATE_TITLE} description="" />
          </div>
        )}

        {!loading &&
          !isEmpty(filteredRecipes) &&
          filteredRecipes.map((recipe) => <RecipeItem key={recipe?.template?.id} recipe={recipe} />)}
      </StyledRecipesWrapper>
    </>
  );
};

export default Recipes;
