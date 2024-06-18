import mergeSort from "../utils/merge_sort.js";
import removeDuplicates from "../utils/remove_duplicates.js";
import Node from "./node.js";

export default class Tree {
    constructor(array) {
        // Sort array
        removeDuplicates(array);
        array = mergeSort(array);

        // Create root using sorted array
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const start = 0;
        const end = array.length - 1;

        // Will return the root node
        return this.buildTreeHelper(array, start, end);
    }

    insert(value) {
        let node = this.root;
        const newNode = new Node(value, null, null);

        // There is no root make this the new root
        if (node === null) {
            this.root = newNode;
            return;
        }

        while (node !== null) {
            // Value already exists than return
            if (value === node.data) return;

            // Go left or right depending on the value of node
            if (value > node.data) {
                // If node has no leaf make the new node its leaf
                if (node.right === null) {
                    node.right = newNode;
                    return;
                }

                // Else keep traversing right
                node = node.right;
            } else {
                // If node has no leaf make the new node its leaf
                if (node.left === null) {
                    node.left = newNode;
                    return;
                }

                // Else keep traversing left
                node = node.left;
            }
        }
    }

    deleteItem(value) {
        // If there is no root node
        if (this.root === null) return;

        let node = this.root;
        let parentNode = null;

        while (node !== null) {
            // If node was found
            if (value === node.data) {
                // For leaf node
                if (node.isLeafNode()) {
                    this.deleteLeafNode(node, parentNode);
                    return;
                }

                // For parent node with one-sided children
                if (node.hasOneSidedChildren()) {
                    this.deleteOneSidedNode(node, parentNode);
                    return;
                }

                // For parent node with two sided children
                this.deleteTwoSidedNode(node, parentNode);
                return;
            }

            // Else keep traversing till node is found or end is reached
            parentNode = node;
            if (value > node.data) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
    }

    find(value) {
        // If root is empty than return
        if (this.root === null) return null;

        let node = this.root;
        while (node !== null) {
            // Incase of positive match return the node
            if (node.data === value) return node;

            // For smaller value traverse left subtree
            if (value < node.data) node = node.left;
            // For larger value traverse right subtree
            else node = node.right;
        }

        // If no match was found than return null
        return null;
    }

    levelOrder(callback) {
        // For empty tree just return
        if (this.root === null) return;

        const queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            // Remove node from the queue
            const node = queue.shift();

            // Add children to queue
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);

            // Call the callback on the node
            callback(node);
        }
    }

    inOrder(callback) {
        this.inOrderDFS(this.root, callback);
    }

    preOrder(callback) {
        this.preOrderDFS(this.root, callback);
    }

    postOrder(callback) {
        this.postOrderDFS(this.root, callback);
    }

    height(node) {
        // Null Values don't count
        if (node === null) return 0;

        // Leaf node has zero height
        if (node.isLeafNode()) return 0;

        const leftTreeHeight = this.height(node.left);
        const rightTreeHeight = this.height(node.right);

        // HeightAdditionFactor adds the height contribution of current node
        const heightAdditionFactor = 1;

        // Use the height of the heighest tree
        const height =
            (leftTreeHeight > rightTreeHeight
                ? leftTreeHeight
                : rightTreeHeight) + heightAdditionFactor;

        return height;
    }

    depth(node) {
        return this.height(this.root) - this.height(node);
    }

    isBalanced() {
        // Empty tree is always balanced
        if (this.root === null) return true;

        const leftSubTreeHeight = this.height(this.root.left);
        const rightSubTreeHeight = this.height(this.root.right);

        // Check the conditions for a balance tree
        if (leftSubTreeHeight === rightSubTreeHeight) return true;
        if (leftSubTreeHeight === rightSubTreeHeight + 1) return true;
        if (leftSubTreeHeight === rightSubTreeHeight - 1) return true;

        // Else the tree is not balanced
        return false;
    }

    rebalance() {
        // No need to balance an already balanced tree
        if (this.isBalanced()) return;

        // Store all the data in an array using in-order traversal
        // In-order traversal will store data in sorted form
        const array = [];
        this.inOrder((node) => {
            array.push(node.data);
        });

        // Replace old tree with a new balanced tree
        this.root = this.buildTree(array);
    }

    // Helpers
    buildTreeHelper(array, start, end) {
        // Base case
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        // Create a new node and assign the middle value to it
        const node = new Node(array[mid]);

        // Add nodes to the left and right of the current node
        node.left = this.buildTreeHelper(array, start, mid - 1);
        node.right = this.buildTreeHelper(array, mid + 1, end);

        // Return this node
        return node;
    }

    deleteLeafNode(node, parentNode) {
        // If parentNode is root
        if (parentNode === null) {
            this.root = null;
            return;
        }

        // If on left-side of parent node
        if (node.data < parentNode.data) {
            parentNode.left = null;
            return;
        }

        // If on right-side of parent node
        parentNode.right = null;
    }

    deleteOneSidedNode(node, parentNode) {
        // If on left side of parent node
        if (parentNode.left === node) {
            if (node.left !== null) {
                parentNode.left = node.left;
                return;
            }

            parentNode.left = node.right;
            return;
        }

        // If on right side of parent node
        if (node.left !== null) {
            parentNode.right = node.left;
            return;
        }

        parentNode.right = node.right;
    }

    deleteTwoSidedNode(node, parentNode) {
        parentNode = node;
        // Go to the right sub tree
        node = node.right;
        // Find the left most item in the right sub tree
        while (node.left !== null) {
            node = node.left;
        }
        // Delete the left most item
        this.deleteItem(node.data);
        // Assign its value to the original node that we were supposed to remove
        parentNode.data = node.data;
    }

    inOrderDFS(node, callback) {
        if (node === null) return;
        this.inOrderDFS(node.left, callback);
        callback(node);
        this.inOrderDFS(node.right, callback);
    }

    preOrderDFS(node, callback) {
        if (node === null) return;
        callback(node);
        this.preOrderDFS(node.left, callback);
        this.preOrderDFS(node.right, callback);
    }

    postOrderDFS(node, callback) {
        if (node === null) return;
        this.postOrderDFS(node.left, callback);
        this.postOrderDFS(node.right, callback);
        callback(node);
    }
}
