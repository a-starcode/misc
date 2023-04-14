#include <iostream>

using namespace std;

//===================Linked List Class=============
class List {
 private:
  struct node {
    string data;
    node* next;
  };

  node* head;
  node* current;  // used to iterate through list and then add/delete nodes
  int no_of_elements;

 public:
  List() {
    head = NULL;
    current = NULL;
    no_of_elements = 0;
  }

  void addNode(const string&);
  void winner(int);
  void printList();
  int size() {
    return no_of_elements;
  }

};  // END OF CLASS

//==============Member Functions================
void List::addNode(const string& value) {
  node* n = new node;
  n->data = value;

  if (head != NULL) {
    current = head;

    while (current->next != head)
      current = current->next;

    current->next = n;
  } else
    head = n;

  n->next = head;
  no_of_elements++;
}

void List::printList() {
  current = head;

  while (current->next != head) {
    cout << current->data << " -> ";
    current = current->next;
  }
  cout << current->data << endl;
}

void List::winner(int k) {
  current = head;

  if (k > 0) {
    while (k != 1) {
      current = current->next;
      k--;
    }

  } else {
    while (current->next != head)
      current = current->next;
  }

  cout << current->data << " is the winner\n";
}

int main() {
  List hotPotato;
  int count = -1;

  hotPotato.addNode("Jack");
  hotPotato.addNode("John");
  hotPotato.addNode("James");
  hotPotato.addNode("Jimmy");
  hotPotato.addNode("Jenny");
  hotPotato.printList();

  while (count < 0 || count >= hotPotato.size()) {
    cout << "Enter count : ";
    cin >> count;
  }

  hotPotato.winner(count);

  return 0;
}
