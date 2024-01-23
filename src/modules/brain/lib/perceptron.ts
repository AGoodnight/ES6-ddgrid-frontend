interface InputValues {
  x: number[][];
  y: number[][];
}

export class Perceptron {
  private bias: number = 0;
  private weights: number[] = [];
  private samples: number = 0;
  private accuracy: number = 0;
  private epochs: number = 0;
  private inputs: number[][];
  private expected: number[];
  private learn_rate: number = 0.1;

  get current_bias() {
    return this.bias;
  }
  get current_accuracy() {
    return this.accuracy / this.samples;
  }
  set current_weights(w: number[]) {
    this.weights = w;
  }
  set current_epochs(e: number) {
    this.epochs = e;
  }
  set current_learn_rate(lr: number) {
    this.learn_rate = lr;
  }
  set current_inputs(i: number[][]) {
    this.inputs = i;
  }
  set current_expected(e: number[]) {
    this.expected = e;
  }

  constructor(
    inputs: number[][],
    expected: number[],
    epochs = 10,
    learn_rate = 0.1
  ) {
    this.current_weights = Array.from({ length: inputs[0].length }, () =>
      this.random()
    );
    this.current_epochs = epochs;
    this.current_learn_rate = learn_rate;
    this.current_inputs = this.inputs = inputs;
    this.current_expected = this.expected = expected;
  }

  // Adjusts Perceptrons accuracy and returns accuracy changes as an array
  fit(): number[] {
    return Array.from({ length: this.epochs }, (_, i) => i + 1).map(
      (_epoch: number) => {
        this.inputs.map((_input: number[], i: number) => {

          const prediction = this.predict(_input);

          // adjust the accuracy, based on if it got it right
          prediction === this.expected[i]
            ? (this.accuracy += 1)
            : (this.accuracy -= 1);

          // track samples ran
          this.samples++;

          // calculate loss & update wieghts
          // E = ( x - y ​) [ this may be incorrect or could be better to match l(y) = max(0,1-t*y) ]
          const loss = this.expected[i] - prediction;

          this.adjustWeights(_input, loss);
          this.adjustBias(loss);
        });

        // return accuracy as a member of the return array
        return this.current_accuracy;
      }
    );
  }

  adjustWeights(input: number[], loss: number) {
    // A = [ f(loss * xi * lr),...,n ]
    this.weights = this.weights.map((_weight, i: number) => {
      return (_weight += loss * input[i] * this.learn_rate);
    });
  }

  adjustBias(loss: number) {
    // bias = loss * lr
    this.bias += loss * this.learn_rate;
  }

  activationFunction(n: any) {
    // e = n(wi*xi) > 0
    return n < 0 ? 0 : 1;
  }

  
  predict(input: number[]) {
    // e = f( ∑wi*xi + b )
    // or...
    // total = bias + (w1 * x1) + (w2 + x2) ...
    const total = this.weights.reduce((_total, weight, i: number) => {
      return (_total += input[i] * weight);
    }, this.bias);

    return this.activationFunction(total);
  }

  random() {
    return Math.random() * 2 - 1;
  }
}
