import { getFileExtension } from '../getFileExtension';

describe('getFileExtension', () => {
  it('should return file extension', () => {
    const fileName = 'foo.bar';

    const result = getFileExtension(fileName);

    expect(result).toBe('bar');
  });

  it('should return file extension if there are multiple separators in the file name', () => {
    const fileName = 'foo.bar.baz';

    const result = getFileExtension(fileName);

    expect(result).toBe('baz');
  });

  it('should return file extension in lower case', () => {
    const fileName = 'file.PDF';

    const result = getFileExtension(fileName);

    expect(result).toBe('pdf');
  });

  it('should return an empty string if it has no extension', () => {
    const fileName = 'foo-bar';

    const result = getFileExtension(fileName);

    expect(result).toBe('');
  });

  it('should return an empty string if file name ends with separator', () => {
    const fileName = 'foo.';

    const result = getFileExtension(fileName);

    expect(result).toBe('');
  });

  it('should return an empty string if file name starts with separator', () => {
    const fileName = '.env';

    const result = getFileExtension(fileName);

    expect(result).toBe('');
  });

  it('should return an empty string if file name is not defined', () => {
    const fileName = undefined;

    const result = getFileExtension(fileName);

    expect(result).toBe('');
  });
});
