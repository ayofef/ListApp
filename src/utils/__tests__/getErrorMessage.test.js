import { getErrorMessage } from '../getErrorMessage';

const MOCK_EMPTY_RESULT = {
  hasError: false,
  errorMessage: '',
};

describe('getErrorMessage', () => {
  it('should return hasError as false and errorMessage as empty string if errors undefined', () => {
    const errors = undefined;
    const result = getErrorMessage(errors);

    expect(result).toMatchObject(MOCK_EMPTY_RESULT);
  });

  it('should return hasError as false and errorMessage as empty string if errors is an object {}', () => {
    const errors = {};
    const result = getErrorMessage(errors);

    expect(result).toMatchObject(MOCK_EMPTY_RESULT);
  });

  it('should return hasError as false and errorMessage as empty string if errors is a string', () => {
    const errors = {};
    const result = getErrorMessage(errors);

    expect(result).toMatchObject(MOCK_EMPTY_RESULT);
  });

  it('should return hasError as false and errorMessage as empty string if errors is an empty array', () => {
    const errors = [];
    const result = getErrorMessage(errors);

    expect(result).toMatchObject(MOCK_EMPTY_RESULT);
  });

  it('should return hasError as false and errorMessage as empty string if errors  is defined but error_description is undefined', () => {
    const errors = [];
    const result = getErrorMessage(errors);

    expect(result).toMatchObject(MOCK_EMPTY_RESULT);
  });

  it('should return hasError as true and errorMessage if errors  is defined and error_description is defined', () => {
    const errors = [
      {
        error_description: 'error_description',
      },
    ];
    const result = getErrorMessage(errors);

    expect(result).toMatchObject({
      hasError: true,
      errorMessage: 'error_description',
    });
  });
});
