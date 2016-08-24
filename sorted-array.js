class SortedArray extends Array {
  constructor(arr = [], direction = 'ASC', key = 'id') {
    super(...arr);
    this.direction = direction;
    this.key = key;
  }

  get key() { return this._key }
  set key(key) {
    this._key = key;
    this.sorted = false;
  }

  get direction() { return this._direction }
  set direction(dir) {
    this._direction = dir;
    this.sorted = false;
  }

  get sorted() { return this._sorted }
  set sorted(val) { this._sorted = val }

  sort() {
    Array.prototype.sort.call(this, (a, b) => {
      return typeof this[0][this.key] === 'number' 
        ? this.sortNumeric(a[this.key], b[this.key]) 
        : this.sortString(a[this.key], b[this.key]);
    });
    this.sorted = true;
  }

  sortString(a, b) { return this.direction === 'ASC' ? a < b : b > a }
  sortNumeric(a, b) { return this.direction === 'ASC' ? a - b : b - a }

  toggleDirection() {
    if (this.direction === 'ASC') {
      this.direction = 'DSC';
    } else {
      this.direction = 'ASC';
    }
  }

  [Symbol.iterator]() {
    let index = -1;

    if (!this.sorted) {
      this.sort();
    }
    
    return {
      next: () => ({ value: this[++index], done: !(index in this) })
    };
  }
}

const listView = new SortedArray([{
  id: 1,
  name: 'George',
}, {
  id: 2,
  name: 'Gina',
}, {
  id: 4,
  name: 'Alberta',
}, {
  id: 3,
  name: 'Sam',
}]);

for (let i of listView) {
  console.log(i.id); // 1 2 3 4
}
listView.toggleDirection();
listView.push({id: 14, name: 'Alita'})
listView.key = 'name';
console.log("listView", ...listView) // { name: 'Sam', id: 3 } { name: 'Gina', id: 2 } { name: 'George', id: 1 } ...
