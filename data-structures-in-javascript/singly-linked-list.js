function Node(data) {
  this.data = data;
  this.next = null;
}

function SinglyLinkedList() {
  this.head = null;
  this.tail = null;
  this.numberOfValues = 0;
}

SinglyLinkedList.prototype.add = function (data) {
  var node = new Node(data);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;//point to the new node from the current tail
    this.tail = node;// make the new node the tail. previous tail is no longer the tail but is previous
  }
  this.numberOfValues++;
};
SinglyLinkedList.prototype.reverse = function () {
  if (!this.head) return;
  do {//iterate through the list
    var previous = current || this.head;//hold the pointer to the current node (start with this.head) in the previous variable since it will change on the next line.
    var current = next || previous;//hold the pointer to the next node (start with this.head) in the current variable since it will change on the next line.
    var next = current.next;//make next to be the the next node; next.next must be saved before it is changed below.
    current.next = previous;//make the current node point to previous node on left; break the link to the node on the right
  }  while (next);
  this.tail = this.head;// original head is now the tail
  this.tail.next = null;// break the link from the head to the second node; this is the new tail
  this.head = current;// point head to the current
};
// 			  0 (head)                    -> 1                     -> 2                    -> 3 (tail)                -> null        ; start reverse() original state
// 		  	0 (head; previous)          -> 1                     -> 2                    -> 3 (tail)                -> null        ; var previous = current || this.head;// current is undefined, previous = this.head
// 		 	 	0 (head; previous; current) -> 1                     -> 2                    -> 3 (tail)                -> null        ; var current = next || previous;     // next is undefined, current = this.head
// 		  	0 (head; previous; current) -> 1 (next)              -> 2                    -> 3 (tail)                -> null        ; var next = current.next; //set next to the second node
//        0 (head; previous; current)    1 (next)              -> 2                    -> 3 (tail)                -> null        ; current.next = previous; //point to itself (null != next) continue while
//        0 (head; previous; current)    1 (next)              -> 2                    -> 3 (tail)                -> null        ; var previous = current; //no change since both point to head
//        0 (head; previous)             1 (next; current)     -> 2                    -> 3 (tail)                -> null        ; current = next;
//        0 (head; previous)             1 (current)           -> 2 (next)             -> 3 (tail)                -> null        ; next = current.next;
//        0 (head; previous)          <- 1 (current)              2 (next)                3 (tail)                -> null        ; current.next = previous; (null != next) continue while
//        0 (head)                    <- 1 (current; previous)    2 (next)             -> 3 (tail)                -> null        ; var previous = current;
//        0 (head)                    <- 1 (previous)             2 (next; current)    -> 3 (tail)                -> null        ; current = next;
//        0 (head)                    <- 1 (previous)             2 (current)          -> 3 (tail; next)          -> null        ; next = current.next;
//        0 (head)                    <- 1 (previous)          <- 2 (current)             3 (tail; next)          -> null        ; current.next = previous; (null != next) continue while
//        0 (head)                    <- 1                     <- 2 (current; previous)   3 (tail; next)          -> null        ; var previous = current;
//        0 (head)                    <- 1                     <- 2 (previous)            3 (tail; next; current) -> null        ; current = next;
//        0 (head)                    <- 1                     <- 2 (previous)            3 (tail; current)       -> null (next) ; next = current.next;
//        0 (head)                    <- 1                     <- 2 (previous)         <- 3 (tail; current)          null (next) ; current.next = previous; (null == next) end while
//        0 (head; tail)              <- 1                     <- 2 (previous)         <- 3 (current)                null (next) ; this.tail = this.head;
//null <- 0 (head; tail)              <- 1                     <- 2 (previous)         <- 3 (current)                null (next) ; this.tail.next = null;
//null <- 0 (tail)                    <- 1                     <- 2 (previous)         <- 3 (current; head)          null (next) ; this.head = current; end reverse() end state

SinglyLinkedList.prototype.remove = function (data) {
  var previous = this.head;
  var current = this.head;
  while (current) {
    if (current.data === data) {
      if (current === this.head) {
        this.head = this.head.next;
      }
      if (current === this.tail) {
        this.tail = previous;
      }
      previous.next = current.next;
      this.numberOfValues--;
    } else {
      previous = current;
    }
    current = current.next;
  }
};
SinglyLinkedList.prototype.insertAfter = function (data, toNodeData) {
  var current = this.head;
  while (current) {
    if (current.data === toNodeData) {
      var node = new Node(data);
      if (current === this.tail) {
        this.tail.next = node;
        this.tail = node;
      } else {
        node.next = current.next;
        current.next = node;
      }
      this.numberOfValues++;
    }
    current = current.next;
  }
};
SinglyLinkedList.prototype.traverse = function (fn) {
  var current = this.head;
  while (current) {
    if (fn) {
      fn(current);
    }
    current = current.next;
  }
};

SinglyLinkedList.prototype.length = function () {
  return this.numberOfValues;
};
SinglyLinkedList.prototype.print = function () {
  var string = '';
  var current = this.head;
  while (current) {
    string += current.data + ' ';
    current = current.next;
  }
  console.log(string.trim());
};

var singlyLinkedList = new SinglyLinkedList();
// singlyLinkedList.print(); // => ''
singlyLinkedList.add(1);
singlyLinkedList.add(2);
singlyLinkedList.add(3);
singlyLinkedList.add(4);
singlyLinkedList.print(); // => 1 2 3 4
console.log('length is 4:', singlyLinkedList.length()); // => 4
singlyLinkedList.remove(3); // remove value
singlyLinkedList.print(); // => 1 2 4
singlyLinkedList.remove(9); // remove non existing value
singlyLinkedList.print(); // => 1 2 4
singlyLinkedList.remove(1); // remove head
singlyLinkedList.print(); // => 2 4
singlyLinkedList.remove(4); // remove tail
singlyLinkedList.print(); // => 2
console.log('length is 1:', singlyLinkedList.length()); // => 1
singlyLinkedList.add(6);
singlyLinkedList.print(); // => 2 6
singlyLinkedList.insertAfter(3, 2);
singlyLinkedList.print(); // => 2 3 6
singlyLinkedList.insertAfter(4, 3);
singlyLinkedList.print(); // => 2 3 4 6
singlyLinkedList.insertAfter(5, 9); // insertAfter a non existing node
singlyLinkedList.print(); // => 2 3 4 6
singlyLinkedList.insertAfter(5, 4);
singlyLinkedList.insertAfter(7, 6); // insertAfter the tail
singlyLinkedList.print(); // => 2 3 4 5 6 7
singlyLinkedList.add(8); // add node with normal method
singlyLinkedList.print(); // => 2 3 4 5 6 7 8
console.log('length is 7:', singlyLinkedList.length()); // => 7
singlyLinkedList.traverse(function (node) { node.data = node.data + 10; });
singlyLinkedList.print(); // => 12 13 14 15 16 17 18
singlyLinkedList.traverse(function (node) { console.log(node.data); }); // => 12 13 14 15 16 17 18
console.log('length is 7:', singlyLinkedList.length()); // => 7
singlyLinkedList.reverse();
singlyLinkedList.print();
singlyLinkedList.print();
