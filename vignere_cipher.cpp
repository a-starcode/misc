#include <algorithm>
#include <iostream>
#include <map>

using namespace std;

// function headers
string generateSequence();

// ========================= CLASSES =========================
class Table {  // table of key-value pairs that links letters to their corresponding numbers
 public:
  map<char, int> mp;
  map<int, char> rev_mp;  // since maps dont support search using values, we need another map

  Table() {}
  void initTable(const string& allowedCharacters);
  void printTable();                  // extra, does not print reverse map
  void printTable(const int& order);  // can print either map
};

void Table::initTable(const string& allowedCharacters) {  // fills data in the table
  char letter;
  for (int i = 0; i < allowedCharacters.length(); i++) {
    letter = allowedCharacters[i];
    mp[letter] = i;
    rev_mp[i] = letter;
  }
}

void Table::printTable() {
  for (auto it : mp)
    cout << it.first << " -> " << it.second << endl;
}

void Table::printTable(const int& order) {
  if (order) {
    for (auto it : mp)
      cout << it.first << " -> " << it.second << endl;
  } else {
    for (auto it : rev_mp)
      cout << it.first << " -> " << it.second << endl;
  }
}
// ====================== END OF CLASSES ========================

// ========================== GLOBALS ===========================
const string _allowed_characters = generateSequence();  // here, using a function to generate the string, note: dont include whitespaces
Table _table;

// ========================= FUNCTIONS ==========================
string generateSequence() {  // function to generate set of allowed characters
  string sequence;           // note: dont include whitespaces

  char letter = 'A';  // start with capital A and loop all the way to capital Z
  for (int i = 0; i < 26; i++)
    sequence += letter++;  // goes to next ascii value i.e. next letter

  return sequence;
}

string transformString(const string& str) {
  string newString = str;

  // remove all whitespaces
  newString.erase(std::remove_if(newString.begin(), newString.end(), ::isspace), newString.end());
  // uppercase all letters
  std::transform(newString.begin(), newString.end(), newString.begin(), ::toupper);

  return newString;
}

bool isValidString(const string& str) {
  size_t found = str.find_first_not_of(_allowed_characters);
  if (found != std::string::npos)
    return false;  // find_first_not_of() returns this datatype if it finds a mismatch
  else
    return true;
}

string generateKey(const string& message, const string& keyword) {
  string secretKey;

  while (secretKey.length() < message.length())
    secretKey += keyword;  // keep repeating the word until length exceeds required length

  return secretKey.substr(0, message.length());  // trim down excess amount generated (if any)
}

string encrypt(const string& message, const string& key) {
  string encryptedMessage;
  // iterators (for maps in table) and loop variables
  auto it1 = _table.mp.begin(), it2 = _table.mp.begin();
  auto it = _table.rev_mp.begin();
  int i = 0;

  while (message[i]) {
    it1 = _table.mp.find(message[i]);
    it2 = _table.mp.find(key[i]);

    int encryptIndex = (it1->second + it2->second) % _table.mp.size();  // formula to encrypt
    it = _table.rev_mp.find(encryptIndex);                              // find corresponding letter

    encryptedMessage += it->second;  // append the letter to the encrypted message
    i++;
  }

  return encryptedMessage;
}

string decrypt(const string& message, const string& key) {
  string decryptedMessage;
  // iterators (used for maps in table) and loop variables
  auto it1 = _table.mp.begin(), it2 = _table.mp.begin();
  auto it = _table.rev_mp.begin();
  int i = 0;

  while (message[i]) {
    it1 = _table.mp.find(message[i]);
    it2 = _table.mp.find(key[i]);

    int decryptIndex = (it1->second - it2->second + _table.mp.size()) % _table.mp.size();  // formula to decrypt
    it = _table.rev_mp.find(decryptIndex);                                                 // find corresponding letter

    decryptedMessage += it->second;  // append letter to decrypted message
    i++;
  }

  return decryptedMessage;
}

int main() {
  /*
  NOTE:
          1. modify globals section to change the characters you wanna use
          2. transformString() changes the format of input text, modify it to change the behaviour accordingly
  */
  _table.initTable(_allowed_characters);  // create table using allowed characters [IMPORTANT step]
  cout << "Set of allowed characters (case insensitive)\n\"" << _allowed_characters << "\"\n"
       << endl;

  string message;  // plain text
  string keyword;  // keyword, used to generate the key

  // user input
  cout << "Enter message: ";
  getline(cin, message);
  message = transformString(message);  // change string to required format
  if (!isValidString(message)) {       // if it uses only from the set of allowed characters, its valid
    cout << "Invalid characters used in message! Exiting...\n\n";
    exit(-1);
  }
  cout << "Enter keyword: ";
  getline(cin, keyword);
  keyword = transformString(keyword);  // change string to required format
  if (!isValidString(keyword)) {       // if it uses only from the set of allowed characters, its valid
    cout << "Invalid characters used in keyword! Exiting...\n\n";
    exit(-1);
  }

  // message = transformString("cookies are kinda poggers");
  // keyword = transformString("tasty");

  string key = generateKey(message, keyword);
  string cipherText = encrypt(message, key);
  string decryptedText = decrypt(cipherText, key);

  cout << endl;
  cout << "key: " << key << endl;
  cout << "cipher text: " << cipherText << endl;
  cout << "decrypted text: " << decryptedText << endl;

  return 0;
}
