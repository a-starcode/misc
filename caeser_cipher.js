// ========================= GLOBAL VARIABLES =========================

const THE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const THE_ALPHABET_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";

// ========================= FUNCTIONS =========================

const getIndexOfLetter = (letter, isUpperCase) => {
  if (isUpperCase) {
    for (let i = 0; i < THE_ALPHABET.length; i++) if (letter === THE_ALPHABET[i]) return i;
  } else {
    for (let i = 0; i < THE_ALPHABET_LOWERCASE.length; i++)
      if (letter === THE_ALPHABET_LOWERCASE[i]) return i;
  }
};

const isUpperCase = (letter) => letter === letter.toUpperCase();

const isASymbol = (letter) => /[^A-Z a-z0-9]/.test(letter);

const generateEncryptedMessage = (message, shift) => {
  let encryptedMessage = "";

  for (let i = 0; i < message.length; i++) {
    let letter = message[i];

    if (letter === " " || isASymbol(letter)) {
      // we are assuming all symbols and whitespaces are ignored (not encrypted)

      encryptedMessage += letter;

      continue;
    }

    let encryptedLetter = isUpperCase(letter)
      ? THE_ALPHABET[(getIndexOfLetter(letter, isUpperCase(letter)) + shift) % THE_ALPHABET.length]
      : THE_ALPHABET_LOWERCASE[(getIndexOfLetter(letter) + shift) % THE_ALPHABET_LOWERCASE.length];

    encryptedMessage += encryptedLetter;
  }

  return encryptedMessage;
};

const decryptMessagae = (message, shift) => {
  let decryptedMessage = "";

  for (let i = 0; i < message.length; i++) {
    let letter = message[i];

    if (letter === " " || isASymbol(letter)) {
      // we are assuming all symbols and whitespaces are ignored (not encrypted)

      decryptedMessage += letter;

      continue;
    }

    let decryptedLetter = isUpperCase(letter)
      ? THE_ALPHABET[
          (getIndexOfLetter(letter, isUpperCase(letter)) + THE_ALPHABET.length - shift) %
            THE_ALPHABET.length
        ]
      : THE_ALPHABET_LOWERCASE[
          (getIndexOfLetter(letter) + THE_ALPHABET.length - shift) % THE_ALPHABET_LOWERCASE.length
        ];

    decryptedMessage += decryptedLetter;
  }

  return decryptedMessage;
};

// ========================= MAIN =========================

const main = () => {
  console.log();

  const ORIGINAL_MESSAGE = "Defend the East wall of the Castle!";

  const SHIFT = 1;

  let encryptedMessage = generateEncryptedMessage(ORIGINAL_MESSAGE, SHIFT);

  console.log("Original : " + ORIGINAL_MESSAGE + "\n");

  console.log("Encrypted: " + encryptedMessage);

  console.log("Decrypted: " + decryptMessagae(encryptedMessage, SHIFT));

  console.log();
};

main();
