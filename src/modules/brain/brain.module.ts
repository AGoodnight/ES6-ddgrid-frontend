import { Perceptron } from "./lib/perceptron";

interface TrainingData {
  input: number[][];
  expected: number[];
}

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

export class Brain {
  neurons: Perceptron[] = [];
  constructor() {
    this.neurons = Array.from({length:100},()=>new Perceptron(trainingData.input, trainingData.expected, 100))  
  }

  fit(){
    // train neurons and return the last accruacy score of each neuron
    const neuronAccuracy:number[]= this.neurons.reduce((report:number[],_neuron:Perceptron,i:number)=>{
      const accuracyOverEpochs = _neuron.fit()
        .reduce((record: any[], accuracy: number, i: number) => {
          record.push(accuracy);
          return record;
        }, []);
        report.push(accuracyOverEpochs[accuracyOverEpochs.length-1])
        return report;
    },[]);
    // console.log(`Accuracy:${JSON.stringify(neuronAccuracy)}`);
    const mean = Array.from(neuronAccuracy).reduce((total:number,_accuracy:number)=>{
      total+=_accuracy; return total;
    },0)/Object.keys(neuronAccuracy).length;

    console.log(`Mean Accuracy: ${mean}`)

    // strip underperfomring neurons
    this.neurons = this.neurons.filter((neuron:Perceptron)=>neuron.current_accuracy > mean);
    this.rePopulateNeurons();
  }

  rePopulateNeurons(){
    const newNeuronsNeeded:number[] = Array.from({length:100 - this.neurons.length});
    this.neurons = [
      ...newNeuronsNeeded.map(()=>new Perceptron(trainingData.input,trainingData.expected,100)),
      ...this.neurons
    ];
  }

  think(input: number[]) {
    console.log("TODO:make think")
    // console.log(this.neurons[0].predict(input));
    // console.log(this.neurons[0].current_bias);
  }
}
