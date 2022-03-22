import { customSortBy } from '../constant';

const data = [
  {
    others: {
      others: 'others',
    },
  },
  {
    foo: {
      foo: 'foo',
    },
  },
  {
    bar: {
      bar: 'bar',
    },
  },
];

describe('customSortBy', () => {
  it('should return undefined if both params are undefined', () => {
    const result = customSortBy();
    expect(result).toBeUndefined();
  });
  it('should return the data if data is defined and sortKey is undefined', () => {
    const result = customSortBy(data, undefined);
    expect(result).toEqual(data);
  });
  it('should return undefined if data is undefined and sortKey is defined', () => {
    const result = customSortBy(undefined, 'foo');
    expect(result).toBeUndefined();
  });
  it('should return sorted data if data is defined and sortKey is defined', () => {
    const result = customSortBy(data, 'others');
    expect(result).toEqual([
      {
        foo: {
          foo: 'foo',
        },
      },
      {
        bar: {
          bar: 'bar',
        },
      },
      {
        others: {
          others: 'others',
        },
      },
    ]);
  });

  it('should return data if data is defined and sortKey is not in the data', () => {
    const result = customSortBy(data, 'xyz');
    expect(result).toEqual(data);
  });
  it('should return data if data is defined and data does not match expected data shape', () => {
    const _data = [
      {
        foo: 'foo',
      },
      {
        bar: 'bar',
      },
    ];

    const result = customSortBy(_data, 'foo');
    expect(result).toEqual(_data);
  });
});
