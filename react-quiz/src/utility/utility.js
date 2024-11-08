function accordUserByScores(scores,accorlates){
    return scores < 25
            ? accorlates.at(-1)
            : scores >= 25 || scores < 50
            ? accorlates[1]
            : scores >= 50 || scores < 80
            ? accorlates[2]
            : accorlates[0]
}
function sumUpScores(scoresArr){
    return scoresArr
    .map((v) => v.score)
    .reduce((curr, acc) => curr + acc, 0);
}
export {accordUserByScores, sumUpScores}