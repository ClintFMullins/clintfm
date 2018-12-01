export class ValueWithInfluence {
  constructor(initialValue, min = 0, max = 100) {
    this.initialValue = initialValue;
    this.min = min;
    this.max = max;
    this.influences = [];
    this.valueRange = max - min;
  }

  addInfluence = ({value, min, max, multiplier = 1}) => {
    this.influences.push({ value, min, max, multiplier });
  }

  getValue = () => {
    let numberOfInfluences = 1;
    const influencingNumbers = [this.initialValue];

    this.influences.forEach((influenceData) => {
      console.log(influenceData)
      const influenceRange = influenceData.max - influenceData.min;
      const baselinedInfluenceValue = influenceData.value - influenceData.min;
      const influenceValue = ((baselinedInfluenceValue / influenceRange) * this.valueRange) + this.min;

      for (let index = 0; index < influenceData.multiplier; index++) {
        influencingNumbers.push(influenceValue);
        numberOfInfluences++;
      }
    });
    console.log(influencingNumbers, numberOfInfluences)
    const sumOfAllInflucences = influencingNumbers.reduce((numA, numB) => numA + numB);
    return Math.round(sumOfAllInflucences / numberOfInfluences);
  }
}