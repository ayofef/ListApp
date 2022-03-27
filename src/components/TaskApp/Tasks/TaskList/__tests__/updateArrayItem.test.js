import { updateArrayItem } from '../constant';

describe('updateArrayItem', () => {
  it('should return null if items is null', () => {
    const updateArray = updateArrayItem({
      items: null,
    });

    expect(updateArray).toBeNull();
  });

  it('should return the passed items if items is defined and id is null', () => {
    const updateArray = updateArrayItem({
      items: [],
      id: null,
    });

    expect(updateArray).toStrictEqual([]);
  });

  it('should return the passed items if fieldKey is undefined', () => {
    const updateArray = updateArrayItem({
      items: [],
    });

    expect(updateArray).toStrictEqual([]);
  });

  it('should return the updated items if all params are defined', () => {
    const updateArray = updateArrayItem({
      items: [
        {
          id: '1',
          foo: 'foo',
        },
        {
          id: '2',
          bar: 'bar',
        },
      ],
      id: '2',
      fieldKey: 'bar',
      newContent: 'snack bar',
    });

    const expectedItems = [
      {
        id: '1',
        foo: 'foo',
      },
      {
        id: '2',
        bar: 'snack bar',
      },
    ];

    expect(updateArray).toStrictEqual(expectedItems);
  });
});
