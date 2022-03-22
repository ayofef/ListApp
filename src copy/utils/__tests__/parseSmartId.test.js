import { parseSmartId } from '../parseSmartId';

describe('parseSmartId', () => {
  it('should return null if value is null', () => {
    const smartId = null;
    const parsedId = parseSmartId(smartId);
    expect(parsedId).toBe(smartId);
  });

  it('should return undefined if value is undefined', () => {
    const smartId = undefined;
    const parsedId = parseSmartId(smartId);
    expect(parsedId).toBe(smartId);
  });

  it('should return an array of string if value is an empty string', () => {
    const smartId = '';
    const parsedId = parseSmartId(smartId);
    expect(parsedId).toStrictEqual(['']);
  });

  it('should return an array of string if value is a valid smart id', () => {
    const smartId = 'payment:123';
    const parsedId = parseSmartId(smartId);
    expect(parsedId).toStrictEqual(['payment', '123']);
  });
});
