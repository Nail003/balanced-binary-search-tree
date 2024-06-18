export default function createRandomArray(size, range) {
    const array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.trunc(Math.random() * range));
    }

    return array;
}
