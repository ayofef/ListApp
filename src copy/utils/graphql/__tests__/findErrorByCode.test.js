import { findErrorByCode } from '../findErrorByCode';

describe('findErrorByCode', () => {
  it('should return undefined if list of errors is empty', () => {
    const result = findErrorByCode([], 'foo');
    expect(result).toBeUndefined();
  });

  it('should return undefined if code is empty', () => {
    const result = findErrorByCode([{ extensions: { code: 'foo' } }], undefined);

    expect(result).toBeUndefined();
  });

  it('should return undefined if there is no error with the code', () => {
    const result = findErrorByCode([{ extensions: { code: 'foo' } }], 'bar');

    expect(result).toBeUndefined();
  });

  it('should return the first error with the code', () => {
    const errors = [
      { extensions: { code: 'foo' } },
      { extensions: { code: 'bar' } },
      { extensions: { code: 'baz' } },
      { extensions: { code: 'bar' } },
    ];
    const result = findErrorByCode(errors, 'bar');

    expect(result).toBe(errors[1]);
  });
});
