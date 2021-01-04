const Node = require('./node')

class Lru {
  constructor(limit) {
    this.limit = limit
    this.length = 0
    this.hash = {}
    this.head = null
    this.tail = null
  }

  set(key, value) {
    const { hash } = this

    const newValue = {
      value,
      key,
      time: new Date(),
    }

    if (!hash[key]) {
      // that means this is a new node, so just put it at the top and if needed delete the tail
      hash[key] = new Node(newValue)
      this.length += 1

      // if the length is 1 this is the first node, set it as head and tail and finish
      if (this.length === 1) {
        this.head = hash[key]
        this.tail = hash[key]
        return
      }

      // set head parent to new node and new node child to current head
      this.head.parent = hash[key]
      hash[key].child = this.head

      // switch and move the new node to be the head
      this.head = hash[key]

      // check if the tail needs to be removed
      if (this.length > this.limit) {
        const keyToRemove = this.tail.value.key
        this.tail.parent.child = null
        this.tail = this.tail.parent
        delete hash[keyToRemove]
        this.length -= 1
      }
      return
    }

    // node isn't new, just update value and simply touch the node with get
    hash[key].value = newValue
    this.get(key)
  }

  get(key) {
    const { hash } = this
    // check if the key exists in the hash, if doesnt, return null
    if (!hash[key]) return null

    const { parent, child } = hash[key]
    // check all four cases and act accourdingly
    if (!parent) return hash[key].value // this is the only node or it's the head, so who cares, just return it

    if (!child) {
      // the node is the tail, we need to move it to the top and set a new tail
      this.tail = hash[key].parent
      this.tail.child = null // no children for the tail
      hash[key].parent = null // no parents for the head

      // need to set the node as the head
      this.head.parent = hash[key]
      hash[key].child = this.head
      this.head = hash[key]
      // finished setting head, can return value
      return hash[key].value
    }

    // last option, this node is somewhere in the middle
    // need to set parent's child to the child and child's parent to the parent
    hash[key].parent.child = child
    hash[key].child.parent = parent

    // now move node to head and update head
    hash[key].parent = null
    hash[key].child = this.head
    this.head.parent = hash[key]
    this.head = hash[key]
    // finished setting head, can return value
    return hash[key].value
  }

  checkTimeValid(key, timeDifference) {
    const node = this.get(key)
    if (!node) return false
    return (new Date() - node.time) < timeDifference
  }
}

module.exports = Lru
