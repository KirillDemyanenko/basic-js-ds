const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
        this.rootOtTree = null;
    }

  root() {
     if (this.rootOtTree) {
        return this.rootOtTree;
     } else {
         return null;
     }
  }

  add(data) {
    if (this.rootOtTree) {
        let current = this.rootOtTree;
        let previos = null;
        while (current) {
            previos = current;
            if (current.data > data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (previos.data > data) {
            previos.left = new Node(data);
        } else {
            previos.right = new Node(data);
        }
    } else {
        this.rootOtTree = new Node(data);
    }
  }

  has(data) {
    let recursiveFind = function (link) {
        if (link) {
            if (link.data === data) {
                return true
            } else {
                if (link.right || link.left) {
                    return Boolean(recursiveFind(link.left) || recursiveFind(link.right))
                } else {
                    return false
                }
            }
        }
    }
    if (this.rootOtTree) {
        return Boolean(recursiveFind(this.rootOtTree.left) || recursiveFind(this.rootOtTree.right))
    } else {
        return false
    }
  }

  find(data) {
    let recursiveFind = function (link) {
        if (link) {
            if (link.data === data) {
                return link
            } else {
                if (link.right || link.left) {
                    let resultLeft = recursiveFind(link.left)
                    let resultRight = recursiveFind(link.right)
                    if (resultLeft) {
                        return resultLeft
                    }
                    else if (resultRight) {
                        return resultRight
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        }
    }
    if (this.rootOtTree) {
        return recursiveFind(this.rootOtTree)
    } else {
        return null
    }
  }

  remove(data) {
    if (this.rootOtTree) {
        let previos = this.rootOtTree;
        let current = this.rootOtTree;
        while (current) {
            if (current.data === data) {
                // если у узла нет потомков
                if (current.left === null && current.right === null) {
                   if (previos.left === current) {
                       previos.left = null;
                   } else {
                       previos.right = null
                    }
                   return "OK"
                }
                // если есть 1 потомок - левый или правый
                else if (current.left === null || current.right === null) {
                    if (current.left === null) {
                        if (previos.left === current) {
                            previos.left = current.right
                        } else {
                             previos.right = current.right
                        }
                    } else {
                        if (previos.left === current) {
                            previos.left = current.left
                        } else {
                             previos.right = current.left
                        }
                    }
                    return "OK"
                }
                else {
                    return "Other"
                }
            }
            else if (current.data > data) {
                previos = current;
                current = current.left;
            } else {
                previos = current;
                current = current.right;
            }
        }
    } else {
        return 'Tree is empty'
    }
  }

  min() {
    if (this.rootOtTree) {
        if (this.rootOtTree.left) {
            let current = this.rootOtTree.left;
            while (current) {
                if (current.left) {
                    current = current.left;
                } else {
                    return current.data;
                }
            }
        } else {
            return this.rootOtTree.data
        }
    } else {
        return null
    }
  }

  max() {
    if (this.rootOtTree) {
        if (this.rootOtTree.right) {
            let current = this.rootOtTree.right;
            while (current) {
                if (current.right) {
                    current = current.right;
                } else {
                    return current.data;
                }
            }
        } else {
            return this.rootOtTree.data
        }
    } else {
        return null
    }
  }
}

module.exports = {
  BinarySearchTree
};