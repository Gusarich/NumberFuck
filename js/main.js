var score = new ExpantaNum('1');
var time = new ExpantaNum('0');
var points = {
    speed: new ExpantaNum('0')
};
var formula = {
    type: 1, // 1 +, 2 *, 3 ^, 4 x^()
    value: new ExpantaNum('1')
};
var upgrades = [
    {
        cost: new ExpantaNum('10'),
        done: new ExpantaNum('0')
    },
    {
        cost: new ExpantaNum('1000'),
        done: 0
    }
];
var automations = [
    {
        cost: new ExpantaNum('e2e2'),
        bulk: new ExpantaNum('0')
    }
];

document.getElementById('score').innerText = normalize(score);

setInterval(tick, 500);
