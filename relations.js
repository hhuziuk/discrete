const fs = require('fs');

function checkEquivalenceRelation(X, relation) {
    let isReflexive = true;
    let isSymmetric = true;
    let isTransitive = true;

    for (let x of X) {
        if (!(x in relation) || !relation[x].has(x)) {
            isReflexive = false;
        }
        for (let y of X) {
            if ((x in relation) && (y in relation) && (relation[x].has(y)) && !relation[y].has(x)) {
                isSymmetric = false;
            }
            for (let z of X) {
                if ((x in relation) && (y in relation) && (z in relation) &&
                    (relation[x].has(y)) && (relation[y].has(z)) && !(relation[x].has(z))) {
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

    // Call the function
    checkEquivalenceRelation(X, relation);
});
