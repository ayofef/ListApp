import { isFreeMail } from '../isFreeMail';

describe('isFreeMail', () => {
  it('should return false if value is undefined', () => {
    const value = undefined;
    const checkedIsFreeMail = isFreeMail(value);

    expect(checkedIsFreeMail).toBe(false);
  });

  it('should return false if value is no a string', () => {
    const value = [];
    const checkedIsFreeMail = isFreeMail(value);

    expect(checkedIsFreeMail).toBe(false);
  });

  it('should return false if value is not a valid email', () => {
    const value = 'https://whenthen.com';
    const checkedIsFreeMail = isFreeMail(value);

    expect(checkedIsFreeMail).toBe(false);
  });

  it('should return false if value is not a free email', () => {
    const value = 'admin@whenthen.com';
    const checkedIsFreeMail = isFreeMail(value);

    expect(checkedIsFreeMail).toBe(false);
  });

  it('should return true if value is a free email', () => {
    const value = 'admin@gmail.com';
    const checkedIsFreeMail = isFreeMail(value);

    expect(checkedIsFreeMail).toBe(true);
  });
});
