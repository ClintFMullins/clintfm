import {calculateDayNightDetails} from './time';

it('gets correct daytime details generally', () => {
  expect(calculateDayNightDetails(12, 0)).toEqual({
    sunHeight: 100,
  });

  expect(calculateDayNightDetails(15, 0)).toEqual({
    sunHeight: 50,
  });

  expect(calculateDayNightDetails(18, 0)).toEqual({
    moonHeight: 0,
    starVisibilty: 0,
  });

  expect(calculateDayNightDetails(21, 0)).toEqual({
    moonHeight: 50,
    starVisibilty: 50,
  });

  expect(calculateDayNightDetails(24, 0)).toEqual({
    moonHeight: 100,
    starVisibilty: 100,
  });

  expect(calculateDayNightDetails(0, 0)).toEqual({
    moonHeight: 100,
    starVisibilty: 100,
  });

  expect(calculateDayNightDetails(3, 0)).toEqual({
    moonHeight: 50,
    starVisibilty: 50,
  });

  expect(calculateDayNightDetails(6, 0)).toEqual({
    sunHeight: 0,
  });

  expect(calculateDayNightDetails(9, 0)).toEqual({
    sunHeight: 50,
  });
});

it('deals with minutes correctly', () => {
  expect(calculateDayNightDetails(12, 45)).toEqual({
    sunHeight: 87.5,
  });
});