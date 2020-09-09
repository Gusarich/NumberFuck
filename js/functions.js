function normalize (value) {
    if (value.lt('1e6')) {
        return value.toFixed(0);
    }
    if (value.lt('e1e6')) {
        return value.toExponential(0).replace('+', '');
    }
    if (value.lt('eeeee1')) {
        return value.toFixed(0);
    }
    let v = value.toHyperE();
    if (v.includes('.')) {
        v = v.split('.');
        v = v[0] + '#' + v[1].split('#')[1];
    }
    return v;
}

function tick () {
    time = time.plus(1);

    if (formula.type == 1) {
        score = score.plus(formula.value);
    }
    else if (formula.type == 2) {
        score = score.times(formula.value);
    }
    else if (formula.type == 3) {
        score = score.pow(formula.value);
    }

    document.getElementById('time').innerText = normalize(time);
    document.getElementById('score').innerText = normalize(score);
}

function increaseFormulaValue () {
    if (score.gte(upgrades[0].cost)) {
        score = score.div(upgrades[0].cost);
        upgrades[0].cost = upgrades[0].cost.times(2);
        formula.value = formula.value.plus(1);

        document.getElementById('score').innerText = normalize(score);
        document.getElementById('upgradeCost1').innerText = normalize(upgrades[0].cost);
        document.getElementById('formula').innerText = 's(t) ' + '+ ' + normalize(formula.value);
    }
}
