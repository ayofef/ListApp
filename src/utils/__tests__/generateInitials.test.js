import { generateInitials } from '../generateInitials';

describe('generateInitials', () => {
  it('should return empty string if name is null', () => {
    const initials = generateInitials(null);
    expect(initials).toBe('');
  });

  it('should return empty string if name is an array', () => {
    const initials = generateInitials([]);
    expect(initials).toBe('');
  });

  it('should return empty string if name is undefined', () => {
    const initials = generateInitials(undefined);
    expect(initials).toBe('');
  });

  it('should return empty string if name is an empty string', () => {
    const initials = generateInitials('foo');
    expect(initials).toBe('f');
  });

  it('should return first letter of the first name if name there no last name', () => {
    const initials = generateInitials('foo');
    expect(initials).toBe('f');
  });

  it('should return initials if name is divided by space', () => {
    const initials = generateInitials('foo bar');
    expect(initials).toBe('fb');
  });
});
