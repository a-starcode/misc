#include <cmath>
#include <iostream>

using namespace std;

// ======================= FUNCTIONS ===========================
bool isPrime(int number) {
  if (number <= 1) return false;
  if (number <= 3) return true;  // must be 2 or 3 which are primes

  if (number % 2 == 0 || number % 3 == 0)
    return false;

  // all primes > 3 are of the form (6k ± 1) && we only need to check upto the square root of number
  for (int i = 5; i * i <= number; i += 6) {       // we already checked 2 and 3, we know 4 is not prime, so start with 5
    if (number % i == 0 || number % (i + 2) == 0)  // i is of the form (6k - 1), so to check for (6k + 1) we need to add 2
      return false;
  }

  return true;
}

// ========================= CLASSES ===========================
class Globals {
 public:
  int g, p;

  Globals() {}
};

class Person {
 private:
  int secretNumber;

 public:
  string name;
  int recieved, computedValue;

  // annoying ship
  Person() {}
  int getSecretNumber();
  void setSecretNumber(int& secretNum);

  // helper functions
  int calculateValueToSend(Globals& globals);
  int computeKey(Globals& globals);
  void printPerson();
};

int Person::getSecretNumber() {
  return secretNumber;
}

void Person::setSecretNumber(int& secretNum) {
  secretNumber = secretNum;
}

int Person::calculateValueToSend(Globals& globals) {
  return (long long)pow(globals.g, getSecretNumber()) % globals.p;
}

int Person::computeKey(Globals& globals) {
  computedValue = (long long)pow(recieved, getSecretNumber()) % globals.p;

  return computedValue;  // optional
}

void Person::printPerson() {
  cout << name << " {" << endl;
  cout << "\tsecretNumber: " << secretNumber << "," << endl;
  cout << "\trecieved: " << recieved << "," << endl;
  cout << "\tcomputedValue: " << computedValue << endl
       << "}\n";
}
// ====================== END OF CLASSES =======================

int main() {
  Globals globals;  // grouping the public variables together so that its easier to pass them to various functions
  Person alice, bob;

  // names aren't necessary for the code to run
  alice.name = "alice";
  bob.name = "bob";

  // user input
  int temp = 24;  // dummy composite value
  while (!isPrime(temp)) {
    cout << "Enter a prime number: ";
    cin >> temp;
  }
  globals.p = temp;

  cout << "Enter 'g' value: ";
  cin >> globals.g;
  cout << "Enter alice's secret number: ";
  cin >> temp;
  alice.setSecretNumber(temp);
  cout << "Enter bob's secret number: ";
  cin >> temp;
  bob.setSecretNumber(temp);

  // they exchange g^x values
  bob.recieved = alice.calculateValueToSend(globals);
  alice.recieved = bob.calculateValueToSend(globals);

  // they decrypt the message by raising the recieved values to their secret numbers
  alice.computeKey(globals);
  bob.computeKey(globals);

  cout << "\n\n";
  alice.printPerson();
  cout << endl;
  bob.printPerson();

  return 0;
}
