export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array[0]
}