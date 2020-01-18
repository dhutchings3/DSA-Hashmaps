class _Node {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    //insert at beginning
    insertAtFront(value) {
      let newNode = new _Node(value, this.head);
      this.head = newNode;
    }
  
    //insert before a key
    insertBefore(key, value) {
      let newNode = new _Node(value, null);
      let currentNode = this.head;
      let previousNode = null;
  
      while (currentNode.value !== key) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      if (currentNode === this.head) {
        newNode.next = currentNode;
        this.head = newNode;
      } else {
        previousNode.next = newNode;
        newNode.next = currentNode;
      }
    }
  
    //insert after a key
    insertAfter(key, value) {
      let newNode = new _Node(value, null);
      let currentNode = this.head;
  
      while (currentNode.value !== key) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
  
    //insert at an index
    insertAtIndex(index, value) {
      let currentNode = this.head;
      let count = 0;
  
      while (count < index) {
        currentNode = currentNode.next;
        count++;
      }
  
      let newNode = new _Node(value, null);
      console.log("currentNode", currentNode.value);
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
  
    //insert at end
    insertAtEnd(value) {
      let newNode = new _Node(value, null);
      let currentNode = this.head;
  
      while (currentNode.next != null) {
        currentNode = currentNode.next;
      }
  
      currentNode.next = newNode;
    }
  
    //remove by value
    removeByValue(value) {
      let currentNode = this.head;
      let previousNode = null;
  
      while (currentNode.value !== value) {
        if (currentNode.next === null) {
          return "Item not found";
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
  
      if (currentNode === this.head) {
        this.head = currentNode.next;
      } else {
        previousNode.next = currentNode.next;
      }
    }
  
    //find by value
    findbyValue(value) {
      let currentNode = this.head;
  
      while (currentNode.value !== value) {
        currentNode = currentNode.next;
      }
      return currentNode.value;
    }
  
    printList() {
      let currentNode = this.head;
  
      while (currentNode.next !== null) {
        console.log(currentNode.value);
        currentNode = currentNode.next;
      }
      console.log(currentNode.value);
    }
  
    reverseList() {
      let currentNode = this.head;
      let previousNode = null;
  
      while (currentNode.next !== null) {
        //store next node
        let tempNext = currentNode.next;
  
        //reverse where next is pointing
        currentNode.next = previousNode;
  
        previousNode = currentNode;
        console.log(currentNode);
        currentNode = tempNext;
      }
  
      this.head = currentNode;
    }
  }
  
  module.exports = LinkedList;