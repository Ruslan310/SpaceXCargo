function clearPrice(value: string = '') {
  let regNum = /[^.,\d]|(?<=\.)\D+|(?<=,)\D+/g; // number . ,
  let lengthLine = value.length; // line length
  let lastEl = value[lengthLine - 1]; // last element in line
  let isPoint = lengthLine && lengthLine > 3 && value[lengthLine - 3] === '.'; // check point length -2
  let isPointZero =
    lengthLine && lengthLine > 2 && value[lengthLine - 2] === '.'; // check point length -1
  let isZero = lastEl === '0'; // last el is zero
  let isDoubleZero = value[lengthLine - 2] === '0'; // next el is zero
  let lastSum = value.split(',').pop() || 0; //sum last number

  if (
    (lengthLine && (value === '.' || value === ',')) ||
    (isDoubleZero && lastEl !== '.' && lastSum < 10) ||
    (isDoubleZero && isZero) ||
    (isPointZero && isZero) ||
    lastSum > 10
  ) {
    return value.substring(0, value.length - 1);
  }
  return isPoint && lastEl !== ','
    ? value.substring(0, value.length - 1)
    : value.replace(regNum, '');
}

export function formatPrice(value: string) {
  return clearPrice(value);
}
