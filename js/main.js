var score = new ExpantaNum('1');
var time = new ExpantaNum('0');
var formula = {
    type: 1, // 1 +, 2 *, 3 ^, 4 x^()
    value: new ExpantaNum('2')
};
var upgrades = [
    {
        cost: new ExpantaNum('10')
    }
];

document.getElementById('score').innerText = normalize(score);

setInterval(tick, 500);
