import { Perceptron } from "./lib/perceptron";

interface TrainingData {
  input: number[][];
  expected: number[];
}

export class Brain {
  neurons: Perceptron[] = [];
  constructor() {
    const trainingData: TrainingData = {
      input: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 0],
        [0, 0, 1],
        [0, 1, 1],
        [1, 0, 0],
      ],
      expected: [1, 0, 0, 1, 0, 0, 1],
    };
    console.log(
      `Initial Training Data ( Input, Expected ): 
      ${JSON.stringify(trainingData.input)}:
      ${JSON.stringify(trainingData.expected)}`
    );
    this.neurons = [
      new Perceptron(trainingData.input, trainingData.expected, 100),
    ];
    const accuracyOverEpochs = this.neurons[0]
      .fit()
      .reduce((record: any, accuracy: number, i: number) => {
        record[i] = accuracy;
        return record;
      }, {});
    console.log(`Accuracy:${JSON.stringify(accuracyOverEpochs)}`);
  }

  think(input: number[]) {
    console.log(this.neurons[0].predict(input));
    console.log(this.neurons[0].current_bias);
  }
}
