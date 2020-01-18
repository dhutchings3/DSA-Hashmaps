const LinkedList = require("./LinkedList.js");

class HashMapSeparate {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error("Key error");
    }

    return this._hashTable[index].value;
  }

  getByIndex(index) {
    return this._hashTable[index].value;
  }

  getKeyByIndex(index) {
    return this._hashTable[index].key;
  }

  checkIfExists(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      return false;
    }
    return true;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMapSeparate.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapSeparate.SIZE_RATIO);
    }

    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
    }
    if (this.checkIfExists(key)) {
      if (this._hashTable[index].value instanceof LinkedList) {
        this._hashTable[index].value.insertAtFront(value);
      } else {
        let chainColl = new LinkedList();
        chainColl.insertAtFront(this._hashTable[index].value);
        chainColl.insertAtFront(value);
        this._hashTable[index] = {
          key,
          value: chainColl,
          DELETED: false
        };
      }
    } else {
      this._hashTable[index] = {
        key,
        value,
        DELETED: false
      };
    }
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error("Key error");
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMapSeparate._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;

    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMapSeparate.MAX_LOAD_RATIO = 0.5;
HashMapSeparate.SIZE_RATIO = 3;

module.exports = HashMapSeparate;