import { handleHomepageDateInterval } from '../constant';

describe('handleHomepageDateInterval', () => {
  it('should return 1hr interval if gt is null and lt is defined', () => {
    const dateObject = {
      gt: null,
    };

    const result = handleHomepageDateInterval(dateObject);

    expect(result).toStrictEqual({
      interval: 60,
      momentKey: 'hour',
    });
  });

  it("should return start to today's interval if gt is defined and lt is null", () => {
    const dateObject = {
      gt: new Date(),
      lt: null,
    };

    const result = handleHomepageDateInterval(dateObject);

    expect(result).toStrictEqual({
      interval: 60,
      momentKey: 'hour',
    });
  });

  it('should return 1hr interval if gt < lt', () => {
    const dateObject = {
      gt: new Date(2022, 1, 1),
      lt: new Date(2021, 1, 1),
    };

    const result = handleHomepageDateInterval(dateObject);

    expect(result).toStrictEqual({
      interval: 60,
      momentKey: 'hour',
    });
  });

  it('should return 1hr interval if gt === lt', () => {
    const dateObject = {
      gt: new Date(2022, 1, 1),
      lt: new Date(2022, 1, 1),
    };

    const result = handleHomepageDateInterval(dateObject);

    expect(result).toStrictEqual({
      interval: 60,
      momentKey: 'hour',
    });
  });

  it('should return 1hr interval if gt is in the future and lt is null', () => {
    const dateObject = {
      gt: new Date(3000, 1, 1),
      lt: null,
    };

    const result = handleHomepageDateInterval(dateObject);

    expect(result).toStrictEqual({
      interval: 60,
      momentKey: 'hour',
    });
  });
});
