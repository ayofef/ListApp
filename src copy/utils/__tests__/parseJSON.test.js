import { parseJSON } from '../parseJSON';

const DEFAULT_FALLBACK_VALUE = {};
const MOCK_OBJECT = {
  foo: 'foo',
  bar: 'bar',
};

describe('parseJSON', () => {
  it('should return an empty object if value is null', () => {
    const value = null;
    const json = parseJSON(value);
    expect(json).toMatchObject(DEFAULT_FALLBACK_VALUE);
  });

  it('should return an empty object if value is undefined', () => {
    const value = undefined;
    const json = parseJSON(value);
    expect(json).toMatchObject(DEFAULT_FALLBACK_VALUE);
  });

  it('should return an empty object if value is an empty string', () => {
    const value = '';
    const json = parseJSON(value);
    expect(json).toMatchObject(DEFAULT_FALLBACK_VALUE);
  });

  it('should return an the value if value is an object', () => {
    const value = MOCK_OBJECT;
    const json = parseJSON(value);
    expect(json).toMatchObject(value);
  });

  it('should return the parsed JSON if value is a valid JSON', () => {
    const value = JSON.stringify(MOCK_OBJECT);
    const json = parseJSON(value);
    expect(json).toMatchObject(MOCK_OBJECT);
  });
});
