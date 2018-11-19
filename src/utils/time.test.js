import {calculateDayNightDetails, getSectionOpacity} from './time';

describe('getSectionOpacity', () => {
  it('should work (4)', () => {
    expect(getSectionOpacity(6, [0, 6, 12, 18], 4)).toEqual(
      [0, 100, 0, 0],
    );
  });

  it('should work (10)', () => {
    expect(getSectionOpacity(6, [0, 6, 12, 18], 10)).toEqual(
      [40, 100, 40, 0],
    );
  });

  it('should work (24)', () => {
    expect(getSectionOpacity(6, [0, 6, 12, 18], 24)).toEqual(
      [75, 100, 75, 50],
    );
  });
});

it('gets correct daytime details generally', () => {
  expect(calculateDayNightDetails(12, 0)).toEqual({
    hour: 12,
    skySpherePercentY: 100,
    skySpherePercentX: 50,
    isDay: true,
  });

  expect(calculateDayNightDetails(15, 0)).toEqual({
    hour: 15,
    skySpherePercentY: 50,
    skySpherePercentX: 75,
    isDay: true,
  });

  expect(calculateDayNightDetails(18, 0)).toEqual({
    hour: 18,
    skySpherePercentY: 0,
    skySpherePercentX: 0,
    isDay: false,
  });

  expect(calculateDayNightDetails(21, 0)).toEqual({
    hour: 21,
    skySpherePercentY: 50,
    skySpherePercentX: 25,
    isDay: false,
  });

  expect(calculateDayNightDetails(24, 0)).toEqual({
    hour: 24,
    skySpherePercentY: 100,
    skySpherePercentX: 50,
    isDay: false,
  });

  expect(calculateDayNightDetails(0, 0)).toEqual({
    hour: 0,
    skySpherePercentY: 100,
    skySpherePercentX: 50,
    isDay: false,
  });

  expect(calculateDayNightDetails(3, 0)).toEqual({
    hour: 3,
    skySpherePercentY: 50,
    skySpherePercentX: 75,
    isDay: false,
  });

  expect(calculateDayNightDetails(6, 0)).toEqual({
    hour: 6,
    skySpherePercentY: 0,
    skySpherePercentX: 0,
    isDay: true,
  });

  expect(calculateDayNightDetails(9, 0)).toEqual({
    hour: 9,
    skySpherePercentY: 50,
    skySpherePercentX: 25,
    isDay: true,
  });
});

it('deals with minutes correctly', () => {
  expect(calculateDayNightDetails(12, 45)).toEqual({
    hour: 12,
    skySpherePercentY: 87.5,
    skySpherePercentX: 56.25,
    isDay: true,
  });
});