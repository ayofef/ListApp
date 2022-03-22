import { parseBoolean } from '../parseBoolean';

describe('parseBoolean', () => {
  it('should return null if value is null', () => {
    const value = null;
    const parsedValue = parseBoolean(value);

    expect(parsedValue).toBe(null);
  });

  it('should return null if value is an []', () => {
    const value = [];
    const parsedValue = parseBoolean(value);

    expect(parsedValue).toBe(null);
  });

  it('should return null if value is an {}', () => {
    const value = {};
    const parsedValue = parseBoolean(value);

    expect(parsedValue).toBe(null);
  });

  it('should return null if value is not a boolean string', () => {
    const value = 'foo';
    const parsedValue = parseBoolean(value);

    expect(parsedValue).toBe(null);
  });

  it('should return null if value is a boolean string', () => {
    const value = 'false';
    const parsedValue = parseBoolean(value);

    expect(parsedValue).toBe(false);
  });
});
