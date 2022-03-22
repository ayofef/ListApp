import { isValidUrl } from '../isValidUrl';

describe('isValidUrl', () => {
  it('should return false if value is null', () => {
    const url = null;
    const isValid = isValidUrl(url);
    expect(isValid).toBe(false);
  });

  it('should return false if value is undefined', () => {
    const url = undefined;
    const isValid = isValidUrl(url);
    expect(isValid).toBe(false);
  });

  it('should return false if value is an empty string', () => {
    const url = '';
    const isValid = isValidUrl(url);
    expect(isValid).toBe(false);
  });

  it('should return false if value is not a valid url', () => {
    const url = 'foo-bar';
    const isValid = isValidUrl(url);
    expect(isValid).toBe(false);
  });

  it('should return true if value is a valid url', () => {
    const url = 'https://foo.bar';
    const isValid = isValidUrl(url);
    expect(isValid).toBe(true);
  });
});
