import Tree from "./balanced_bst/balanced_bst.js";
import createRandomArray from "./utils/createRandomArray.js";
import { logTree } from "./utils/log.js";
import { prettyPrint } from "./utils/pretty_print.js";

const arraySize = 5;
const numberRange = 100;
let array = createRandomArray(arraySize, numberRange);
const balancedTree = new Tree(array);

// Verify first set of data
prettyPrint(balancedTree.root);
logTree(balancedTree);

// Add more elements in the array
console.log("Adding random elements in tree");
array = createRandomArray(arraySize, numberRange);
for (const element of array) {
    balancedTree.insert(element);
}

// Verify second set of data
prettyPrint(balancedTree.root);
console.log("Is Tree Balanced:", balancedTree.isBalanced());
console.log("Rebalancing tree");
balancedTree.rebalance();

prettyPrint(balancedTree.root);
logTree(balancedTree);
