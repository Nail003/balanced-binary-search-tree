export default function mergeSort(array) {
    if (array.length <= 1) return array;

    const start = 0;
    const end = array.length;
    const mid = Math.trunc((start + end) / 2);

    let sortedArray = [];
    const leftArraySorted = mergeSort(array.slice(start, mid));
    const rightArraySorted = mergeSort(array.slice(mid, end));

    while (leftArraySorted.length > 0 && rightArraySorted.length > 0) {
        const leftElement = leftArraySorted[0];
        const rightElement = rightArraySorted[0];

        if (leftElement <= rightElement) {
            sortedArray.push(leftArraySorted.shift());
        } else {
            sortedArray.push(rightArraySorted.shift());
        }
    }

    sortedArray = [...sortedArray, ...leftArraySorted];
    sortedArray = [...sortedArray, ...rightArraySorted];

    return sortedArray;
}
