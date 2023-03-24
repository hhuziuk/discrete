const fs = require('fs');

// Wczytywanie zdania z pliku tekstowego (np. "zdanie.txt")
const zdanie = fs.readFileSync('index.txt', 'utf8').trim();

// Parsowanie spójników - używają one symboli &&, || oraz !
const parseZdanie = (str) => str.replace(/N/g, '!').replace(/D/g, '||').replace(/C/g, '&&')
    .replace(/I/g, '<=').replace(/E/, '===');

// Sprawdzanie wszystkich możliwości p,q,r
let isTautology = true;
const truthTable = [];

const variables = ['p', 'q', 'r'].filter(v => zdanie.includes(v));
const variableCombinations = variables.map(v => [true, false]);

function buildTruthTable(index, values) {
    if (index === variableCombinations.length) {
        const [p, q, r] = values;
        const wynikZdania = eval(parseZdanie(zdanie));
        truthTable.push({ p, q, r, wynikZdania });
        if (!wynikZdania) {
            isTautology = false;
        }
    } else {
        for (const value of variableCombinations[index]) {
            buildTruthTable(index + 1, [...values, value]);
        }
    }
}

buildTruthTable(0, []);

if (isTautology) {
    console.log("To jest tautologia!");
} else {
    console.log("To nie jest tautologia. Tabela prawdy:");
    console.log(variables.join('\t') + '\tWynik');
    for (const row of truthTable) {
        console.log(variables.map(v => row[v]).join('\t') + '\t' + row.wynikZdania);
    }
}