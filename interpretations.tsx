import React from "react";

type Props = {};

function TempPage({}: Props) {
  const variables = [
    {
      name: "Price (Rs.)",
      mean: 5990528.13,
      stdError: 95430.52,
      median: 5600000,
      mode: 4200000,
      stdDev: 1652905.1,
      highLow: "low",
      variance: 2732095291492.15,
      kurtosis: 2.61,
      skewness: 1.48,
      min: 4200000,
      max: 13300000,
      CI: 1.878,
    },
    {
      name: "Price (in lakh Rs.)",
      mean: 59.9,
      stdError: 0.95,
      median: 56,
      mode: 42,
      stdDev: 16.52,
      highLow: "low",
      variance: 273.21,
      kurtosis: 2.61,
      skewness: 1.48,
      min: 42,
      max: 133,
      CI: 1.878,
    },
    {
      name: "Area (sq. feet)",
      mean: 6045.48,
      stdError: 127.79,
      median: 6000,
      mode: 6000,
      stdDev: 2213.42,
      highLow: "high",
      variance: 4899234.98,
      kurtosis: 2.59,
      skewness: 1.17,
      min: 1905,
      max: 16200,
      CI: 251.485,
    },
  ];

  function interpretMean(mean: number, variableName: string) {
    return `${variableName} on average is ${mean}`;
  }
  function interpretMedian(median: number, variableName: string) {
    return `Half of the ${variableName} values are above ${median} and half are below`;
  }
  function interpretMode(mode: number, variableName: string, others: number) {
    let interpretation = `The mode frequently occurring ${variableName} value is ${mode},it is `;

    if (others === 1) {
      interpretation += "Unimodal";
    } else if (others === 2) {
      interpretation += "Bimodal";
    } else {
      interpretation += "Multimodal";
    }

    return interpretation;
  }
  function interpretStdDeviation(stdDev: number, variableName: string, highLow: string) {
    let interpretation = `Spread of ${variableName} values is ${highLow}`;

    if (stdDev < 10) {
      interpretation += "low";
    } else {
      interpretation += "high";
    }
    return interpretation;
  }
  function interpretKurtosis(kurtosis: number, variableName: string) {
    if (kurtosis === 0) {
      return `Kurtosis of ${variableName} is 0, Mesokurtic`;
    } else if (kurtosis > 1) {
      return `Kurtosis of ${variableName} is positive, Lepokurtic`;
    } else {
      return `Kurtosis of ${variableName} is negative, Platykurtic`;
    }
  }
  function interpretSkewness(skewness: number, variableName: string) {
    return `${variableName} is ${
      skewness > 0 ? "positively" : "negatively"
    } skewed, mean value is ${skewness > 0 ? "higher" : "lower"} than median because of some ${
      skewness > 0 ? "high" : "low"
    } values`;
  }
  function interpretRange(variableName: string, max: number, min: number) {
    return `${variableName} values lie between ${min} and ${max}`;
  }
  function interpretStdError(stdError: number, variableName: string, mean: number) {
    return `Sample mean of ${mean} is an ${
      stdError > 5 ? "inaccurate" : "accurate"
    } estimate of population ${variableName}`;
  }
  function interpretCI(CI: number, variableName: string, mean: number) {
    return `We are 95% certain that the mean ${variableName} value lies between ${CI - mean} and ${
      CI + mean
    }`;
  }

  return (
    <div className="grid place-items-center h-screen w-screen">
      <div className="flex flex-col gap-2 py-10">
        {variables.map((variable, index) => {
          return (
            <div className="flex flex-col gap-2 text-white-default text-m">
              <br />
              <strong>{`${variable.name}\n`}</strong>
              <span className="">{`${interpretMean(variable.mean, variable.name)}\n`}</span>
              <span className="">{`${interpretMedian(variable.median, variable.name)}\n`}</span>
              <span className="">{`${interpretMode(variable.mode, variable.name, 1)}\n`}</span>
              <span className="">
                {interpretStdDeviation(variable.stdDev, variable.name, variable.highLow)}
              </span>
              <span className="">{`${interpretKurtosis(variable.kurtosis, variable.name)}\n`}</span>
              <span className="">{`${interpretSkewness(variable.skewness, variable.name)}\n`}</span>
              <span className="">{`${interpretRange(
                variable.name,
                variable.max,
                variable.min
              )}\n`}</span>
              <span className="">
                {interpretStdError(variable.stdError, variable.name, variable.mean)}
              </span>
              <span className="">{`${interpretCI(
                variable.CI,
                variable.name,
                variable.mean
              )}\n`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TempPage;
