function normalize (value) {
    if (value.lt('1e6')) {
        return value.floor().toFixed(0);
    }
    if (value.lt('e2e1')) {
        return value.toExponential(0).replace('+', '');
    }
    if (value.lt('eeeee1')) {
        return value.toFixed(1);
    }
    let v = value.toHyperE();
    if (v.includes('.')) {
        v = v.split('.');
        v = v[0] + '#' + v[1].split('#')[1];
    }
    return v;
}

function smlog (value, min) {
    var val = value.log(10).log(10);
    val = val.minus(min);
    if (val.isneg()) {
        return new ExpantaNum('0');
    }
    return val;
}

function tick () {
    time = time.plus(1);

    if (formula.type == 1) {
        score = score.plus(formula.value.pow(points.speed.plus(1)));
    }
    else if (formula.type == 2) {
        score = score.times(formula.value.pow(points.speed.plus(1)));
    }
    else if (formula.type == 3) {
        score = score.pow(formula.value.pow(points.speed.plus(1)));
    }

    for (let i = 0; i < automations.length; i += 1) {
        if (automations[i].bulk.neq(0)) {
            increaseFormulaValue();
        }
    }

    document.getElementById('firstPrestigeReward').innerText = 'to get ' + normalize(smlog(score, 3));

    document.getElementById('time').innerText = normalize(time);
    document.getElementById('score').innerText = normalize(score);
}

function increaseFormulaValue () {
    if (score.gte(upgrades[0].cost)) {
        upgrades[0].done = upgrades[0].done.plus(1);
        formula.value = formula.value.plus(1);

        if (formula.type == 1) {
            upgrades[0].cost = upgrades[0].cost.times(2);
            document.getElementById('formula').innerText = 's(t) ' + '+ ' + normalize(formula.value.pow(points.speed.plus(1)));
        }
        else if (formula.type == 2) {
            upgrades[0].cost = upgrades[0].cost.pow(2);
            document.getElementById('formula').innerText = 's(t) ' + '* ' + normalize(formula.value.pow(points.speed.plus(1)));
        }
        else if (formula.type == 3) {
            upgrades[0].cost = upgrades[0].cost.pow(upgrades[0].done.pow(2));
            document.getElementById('formula').innerText = 's(t) ' + '^ ' + normalize(formula.value.pow(points.speed.plus(1)));
        }

        document.getElementById('upgradeCost1').innerText = normalize(upgrades[0].cost);
    }
}

function upgradeFormulaType () {
    if (score.gte(upgrades[1].cost)) {
        upgrades[1].done += 1;
        formula.type += 1;

        if (upgrades[1].done == 1) {
            upgrades[1].cost = upgrades[1].cost.pow(100);
            document.getElementById('formula').innerText = 's(t) * 2';
        }
        else if (upgrades[1].done == 2) {
            upgrades[1].cost = upgrades[1].cost.pow('eee1');
            document.getElementById('formula').innerText = 's(t) ^ 2';
        }

        formula.value = new ExpantaNum('2');
        document.getElementById('upgradeCost2').innerText = normalize(upgrades[1].cost);
    }
}

function upgradeFirstAutomation () {
    if (score.gte(automations[0].cost)) {
        automations[0].cost = automations[0].cost.pow(automations[0].cost);
        automations[0].bulk = automations[0].bulk.plus(1);

        document.getElementById('automationCost1').innerText = normalize(automations[0].cost);
    }
}

function firstPrestige () {
    points.speed = points.speed.plus(smlog(score, 3));

    score = new ExpantaNum('1');
    formula = {
        type: 1, // 1 +, 2 *, 3 ^, 4 x^()
        value: new ExpantaNum('1')
    };
    upgrades = [
        {
            cost: new ExpantaNum('10'),
            done: new ExpantaNum('0')
        },
        {
            cost: new ExpantaNum('1000'),
            done: 0
        }
    ];

    document.getElementById('upgradeCost1').innerText = normalize(upgrades[0].cost);
    document.getElementById('upgradeCost2').innerText = normalize(upgrades[1].cost);
    document.getElementById('speedPoints').innerText = normalize(points.speed);
}
