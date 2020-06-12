const formatCellInitDescription = cellInit => {
    if (typeof cellInit === "number") {
        return `cell ${cellInit + 1}`;
    } else {
        switch (cellInit.length) {
            case 1:
                return `cell ${cellInit[0] + 1}`;
            case 2:
                return `cells ${cellInit[0] + 1} and ${cellInit[1] + 1}`;
            default:
                const lastIndex = cellInit.length - 1;
                const secondToLast = lastIndex - 1;
                const arrHead = cellInit.slice(0, secondToLast);
                const headDescription = arrHead.map(x => x + 1).toString().replace(/,/g, ", ");
                return `cells ${headDescription}, ${cellInit[secondToLast] + 1} and ${cellInit[lastIndex] + 1}`;
        };
    }
};

const displayAllSolutions = currentAnswer => {
    currentAnswer.solutions.forEach((solution, i) => {
    console.log(`${(i + 1)}. A ${solution.strategy} strategy was found in ${formatCellInitDescription(solution.cellInit)} with the following results:`);
    solution.solved.map(sol => console.log(`    cell ${sol.index + 1} solved, answer: ${sol.updatedAnswer}`));
    solution.narrow.map(nar => console.log(`    cell ${nar.index + 1} narrowed down to possible answers [${nar.updatedAnswer}]`));
    });
};

export default displayAllSolutions;