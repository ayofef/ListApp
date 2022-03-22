import { renderValue } from '../consts';

describe('renderValue', () => {
  it('should return the values if values is not an array', () => {
    const result = renderValue(undefined);
    expect(result).toBeUndefined();
  });

  it('should return the parsed value if values is provided and max is undefined', () => {
    const result = renderValue(['foo'], undefined);
    expect(result).toBe('Foo');
  });

  it('should return the values if values is undefined and max is provided', () => {
    const result = renderValue(undefined, 1);
    expect(result).toBeUndefined();
  });

  it('should return the values if one of the item in the array is not a string', () => {
    const values = ['foo', { bar: 'bar' }];
    const result = renderValue(values, 1);
    expect(result).toStrictEqual(values);
  });

  it('should return the parsed values if values and max are provided', () => {
    const values = ['foo', 'bar', 'xyz'];
    const result = renderValue(values, 2);
    expect(result).toStrictEqual('Foo, Bar...');
  });
});
