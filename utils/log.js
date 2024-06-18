let array = [];

export function logTree(balancedTree) {
    console.log("Is Tree Balanced:", balancedTree.isBalanced());
    console.log("Level-Order");
    balancedTree.levelOrder(storeNodeData);
    logNodeData();
    console.log("In-Order");
    balancedTree.inOrder(storeNodeData);
    logNodeData();
    console.log("Pre-Order");
    balancedTree.preOrder(storeNodeData);
    logNodeData();
    console.log("Post-Order");
    balancedTree.postOrder(storeNodeData);
    logNodeData();
}

function logNodeData() {
    console.log(array);
    array = [];
}

function storeNodeData(node) {
    array.push(node.data);
}
