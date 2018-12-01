import { ValueWithInfluence } from './value-influnce';

describe('ValueWithInfluence', () => {
  it('works without influences', () => {
    const influenceVal = new ValueWithInfluence(50);

    expect(influenceVal.getValue()).toEqual(50);
  });

  it('works with one non-changing influence', () => {
    const influenceVal = new ValueWithInfluence(50);

    influenceVal.addInfluence({
      value: 50,
      valueMin: 0,
      valueMax: 100,
      multiplier: 1,
    });

    expect(influenceVal.getValue()).toEqual(50);
  });

  it('works with one changing influence', () => {
    const influenceVal = new ValueWithInfluence(50);

    influenceVal.addInfluence({
      value: 100,
      valueMin: 0,
      valueMax: 100,
      multiplier: 1,
    });

    expect(influenceVal.getValue()).toEqual(75);
  });

  it('works with one changing influence, scaled influence', () => {
    const influenceVal = new ValueWithInfluence(50);

    influenceVal.addInfluence({
      value: 75,
      valueMin: 50,
      valueMax: 100,
      multiplier: 1,
    });

    expect(influenceVal.getValue()).toEqual(50);
  });

  it('works with one changing influence, scaled value', () => {
    const influenceVal = new ValueWithInfluence(100, 50, 150);

    influenceVal.addInfluence({
      value: 50,
      valueMin: 0,
      valueMax: 100,
      multiplier: 1,
    });

    expect(influenceVal.getValue()).toEqual(100);
  });

  it('works with two changing influence', () => {
    const influenceVal = new ValueWithInfluence(50);

    influenceVal.addInfluence({
      value: 75,
      valueMin: 0,
      valueMax: 100,
      multiplier: 1,
    });
    
    influenceVal.addInfluence({
      value: 25,
      valueMin: 0,
      valueMax: 100,
      multiplier: 1,
    });

    expect(influenceVal.getValue()).toEqual(50);
  });

  it('works with two changing influences, with one worth double', () => {
    const influenceVal = new ValueWithInfluence(50);

    influenceVal.addInfluence({
      value: 0,
      valueMin: 0,
      valueMax: 100,
      multiplier: 1,
    });
    
    influenceVal.addInfluence({
      value: 100,
      valueMin: 0,
      valueMax: 100,
      multiplier: 2,
    });

    expect(influenceVal.getValue()).toEqual(62.5);
  });
});