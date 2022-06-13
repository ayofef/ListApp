//// <reference types="cypress" />
import Button from './Button';

beforeEach(() => {
  const onChangeSpy = cy.spy().as('onChangeSpy');
  cy.mount(
    <Button type="button" color="primary" variant="contained" onClick={onChangeSpy}>
      Button
    </Button>
  );
});

describe('<Button>', () => {
  it('Has button text', () => {
    cy.get('button').then(($btn) => {
      expect($btn.text()).to.equal('Button');
    });
  });

  it('Button styles matches design system', () => {
    cy.get('button').then(($btn) => {
      cy.wrap($btn)
        .should('have.css', 'color', 'rgb(255, 255, 255)')
        .should('have.css', 'backgroundColor', 'rgb(63, 81, 181)')
        .should('have.css', 'borderRadius', '10px');
    });
  });

  it('Calls handler when clicked on', () => {
    cy.get('button').then(($btn) => {
      cy.wrap($btn).click();
      //   cy.screenshot();
    });
  });
});
