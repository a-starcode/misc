class DataPacket {
  constructor(numOfBlocks, numOfBits, data) {
    this.NUM_OF_BLOCKS = numOfBlocks;

    this.NUM_OF_BITS_PER_BLOCK = numOfBits;

    this.data = data;

    this.checkSum = null;
  }
}

// ====================== FUNCTIONS =======================

const addTwoBinaryNumbers = (num1, num2) => {
  // convert the strings to binary numbers (base 2)

  let n1 = Number(parseInt(num1, 2));

  let n2 = Number(parseInt(num2, 2));

  // check if they are valid numbers

  if (isNaN(n1)) console.log("\nFirst number passed was invalid: " + num1);

  if (isNaN(n2)) console.log("\nSecond number passed was invalid: " + num2);

  let sum = n1 + n2;

  return sum.toString(2);
};

const divideDataIntoSegments = (dataPacket) => {
  let segments = [];

  for (let i = 0, j = 0; i < dataPacket.NUM_OF_BLOCKS; i++, j += dataPacket.NUM_OF_BITS_PER_BLOCK) {
    let segmentString = dataPacket.data.substring(j, j + dataPacket.NUM_OF_BITS_PER_BLOCK); // slicing the string into 'k' parts of 'm' bits

    segments.push(segmentString);
  }

  return segments;
};

const adjustSumWithCarryBit = (sum, segmentLength) => {
  // we need to keep the length of sum string equal to the segmentLength at all times, it can happen that a carry is generated at the most significant bit (left-most), so we take that carry bit and add it to the least significant bit (right-most) and get a new "adjusted" sum

  let tempSum = sum;

  // since we are using binary addition, it is impossible for sum length to be greater than (segmentLength + 1), hence we check for === and not > (greater than)

  if (tempSum.length === segmentLength + 1) {
    let carry = tempSum[0]; // store the carry

    tempSum = tempSum.slice(1, tempSum.length); // slice the leftmost bit from sum

    tempSum = addTwoBinaryNumbers(tempSum, carry); // add carry to the sliced sum
  }

  // if after adjusting, the sum still generates a carry as mentioned above, adjust it again

  if (tempSum.length === segmentLength + 1) {
    console.log("\nhmm yes interesting sum you got there: " + tempSum);

    tempSum = adjustSumWithCarryBit(tempSum, segmentLength);
  }

  return tempSum;
};

const addLeadingZeroes = (sum, segmentLength) => {
  let numberOfLeadingZeroes = segmentLength - sum.length; // the expected length of string (i.e. the segmentLength) minus the actual length of string

  let leadingZeroes = "";

  for (let i = 0; i < numberOfLeadingZeroes; i++) leadingZeroes += "0";

  sum = leadingZeroes + sum;

  return sum;
};

const calculateSumOfSegments = (segments, segmentLength) => {
  let sum = segments[0];

  let tempSum;

  for (let i = 1; i < segments.length; i++) {
    tempSum = addTwoBinaryNumbers(sum, segments[i]);

    sum = adjustSumWithCarryBit(tempSum, segmentLength); // go to function def. for more info
  }

  // during calculation, length of sum string decreases and all leading zeroes are lost but we need those zeroes to get proper 1's compliment

  sum = addLeadingZeroes(sum, segmentLength);

  return sum;
};

const getOnesComplement = (number) => {
  // error checking

  let temp = Number(parseInt(number, 2));

  if (isNaN(temp)) console.log("\nInvalid number passed for calculating 1's complement: " + number);

  let onesComplement = "";

  for (let i = 0; i < number.length; i++) {
    if (number[i] === "1") onesComplement += "0";
    else if (number[i] === "0") onesComplement += "1";
  }

  return onesComplement;
};

const calculateCheckSum = (dataPacket) => {
  // chop data into segments

  let segments = divideDataIntoSegments(dataPacket);

  // add all the segments to generate a sum

  let sum = calculateSumOfSegments(segments, dataPacket.NUM_OF_BITS_PER_BLOCK);

  // take 1's compliment of sum

  let checkSum = getOnesComplement(sum);

  return checkSum;
};

const replaceCharacterInStringAtIndex = (originalString, character, index) => {
  if (character.length > 1) {
    console.log("\nInvalid character passed! " + character);

    return null;
  }

  let firstHalf = originalString.substr(0, index);

  let remainingHalf = originalString.substr(index + 1);

  let newString = firstHalf + character + remainingHalf;

  return newString;
};

const transmitterFunction = (sender) => {
  console.log("Data to send: " + sender.data);

  console.log("Sender checkSum: " + sender.checkSum);
};

const alterFunction = (receiver) => {
  const randomIndex = Math.floor(Math.random() * (receiver.data.length - 1) + 1); // random number between 1 and (total data length - 1)

  let alteredBit = getOnesComplement(receiver.data[randomIndex]);

  receiver.data = replaceCharacterInStringAtIndex(receiver.data, alteredBit, randomIndex);
};

const receiverFunction = (sender, receiver) => {
  // if checkSum is string of all zeroes, data is accepted

  if (receiver.checkSum == false) {
    // a string of all zeroes evaluates to false with ==

    console.log("Data accepted!");

    // remove checkSum from data array

    receiver.data = receiver.data.slice(0, receiver.data.length - receiver.NUM_OF_BITS_PER_BLOCK);

    console.log("Data recieved: " + receiver.data);

    console.log("Sender checkSum: " + sender.checkSum);

    console.log("Receiver checkSum: " + receiver.checkSum);
  } else {
    console.log(
      "Invalid Checksum!\nSender checkSum: " +
        sender.checkSum +
        "\nReciever checkSum: " +
        receiver.checkSum +
        "\n\nDeleting all data..."
    );

    receiver.NUM_OF_BLOCKS = null;

    receiver.NUM_OF_BITS_PER_BLOCK = null;

    receiver.data = null;

    receiver.checkSum = null;
  }
};

const main = () => {
  console.log();

  // input values

  const NUM_OF_BLOCKS = 4; // 'k'

  const NUM_OF_BITS_PER_BLOCK = 8; // 'm'

  const originalData = "10011001111000100010010010000100";

  // create sender

  const sender = new DataPacket(NUM_OF_BLOCKS, NUM_OF_BITS_PER_BLOCK, originalData);

  sender.checkSum = calculateCheckSum(sender);

  // Note: does not send actual data, only prints sender details :/

  // transmitterFunction(sender);

  // create receiver && send data + checkSum from sender to receiver

  const receiver = new DataPacket(
    NUM_OF_BLOCKS + 1,
    NUM_OF_BITS_PER_BLOCK,
    originalData + sender.checkSum
  ); // 1 extra block to accomodate for checkSum

  // alters one random bit in receiver's data before calculating checkSum to simulate an error

  alterFunction(receiver);

  receiver.checkSum = calculateCheckSum(receiver);

  // checks if data was transmitted successfully or not

  receiverFunction(sender, receiver);

  console.log();
};

main();
