import { getObjKey } from '../constant';

describe('getObjKey', () => {
  it('should return an empty string if item is empty', () => {
    const result = getObjKey({});
    expect(result).toBe('');
  });
  it('should return an empty string if item is undefined', () => {
    const result = getObjKey(undefined);
    expect(result).toBe('');
  });
  it('should return the first object key if object has multiple key', () => {
    const result = getObjKey({
      foo: 'foo',
      bar: 'bar',
    });
    expect(result).toBe('foo');
  });
});
