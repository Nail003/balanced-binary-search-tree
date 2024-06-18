export default class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    isLeafNode() {
        return this.left === null && this.right === null;
    }

    hasTwoSidedChildren() {
        return this.left !== null && this.right !== null;
    }

    hasOneSidedChildren() {
        return (
            (this.left !== null && this.right === null) ||
            (this.right !== null && this.left === null)
        );
    }
}
