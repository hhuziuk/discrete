const fs = require('fs');

function checkEquivalenceRelation(X, relation) {
    let isReflexive = true;
    let isSymmetric = true;
    let isTransitive = true;

    for (let x of X) {
        // перевіряє, чи містить елемент відношення пару з самим собою (за допомогою методу Set.has()).
        // Якщо ні, то відношення не є рефлексивним, тобто на діагоналі матриці відношення є пропуски.
        if (!(x in relation) || !relation[x].has(x)) {
            isReflexive = false;
        }
        for (let y of X) {
            // перебирає всі елементи відношення знову і порівнює їх пари. Умова перевіряє, чи є відповідні пари (x, y) та
            // (y, x) відносно елементів x та y. Якщо ні, то відношення не є симетричним.
            if ((x in relation) && (relation[x].has(y)) && (!(y in relation) || !relation[y].has(x))) {
                isSymmetric = false;
            }
            for (let z of X) {
                // перевіряє транзитивність відношення. Він перебирає всі елементи відношення та шукає такі пари (x, y) та (y, z),
                // щоб також була пара (x, z). Якщо ні, то відношення не є транзитивним.
                if ((x in relation) && (y in relation) && (relation[x].has(y)) && (relation[y].has(z)) && (!(x in relation) || !relation[x].has(z))) {
                    isTransitive = false;
                }
            }
        }
    }

    if (isReflexive && isSymmetric && isTransitive) {
        console.log("The relation is an equivalence relation.");
    } else {
        if (!isReflexive) {
            console.log("The relation is not reflexive.");
        }
        if (!isSymmetric) {
            console.log("The relation is not symmetric.");
        }
        if (!isTransitive) {
            console.log("The relation is not transitive.");
        }
        console.log("The relation is not an equivalence relation.");
    }
}

fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    const input = data.trim().split('\n');
    const X = input[0].split(' ');
    const relation = {};
    for (let pair of input.slice(1)) {
        const [x, y] = pair.split(' ');
        if (!(x in relation)) {
            relation[x] = new Set();
        }
        relation[x].add(y);
    }

    checkEquivalenceRelation(X, relation);
});