export default function removeDuplicates(array) {
    // Remove duplicates from array
    // Modifies the input
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i === j) continue;
            if (array[i] === array[j]) {
                array.splice(j, 1);
            }
        }
    }
}
