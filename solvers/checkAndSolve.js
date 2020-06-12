import { checkValid } from "./checkValid";
import { applyStratsWithChains } from "./applyStratsWithChains"
import solveWithStandardOptions from "./applyStratsWithChains";

const checkAndSolveTemplate = (solverFunction) => gridString => {
    const confirmValid = checkValid(gridString);
    if (!confirmValid.valid) {
        return confirmValid;
    } else {
        const attempt = solverFunction(confirmValid.formattedGrid);
        const strategiesUsed = [...new Set(attempt.solutions.map(x => x.strategy))];
        return {
            gridString: confirmValid.gridString,
            formattedGrid: confirmValid.formattedGrid,
            recurSolution: confirmValid.solution,
            ...attempt,
            strategiesUsed,
            valid: true,
            
        };
    }
}

const checkAndSolve = checkAndSolveTemplate(solveWithStandardOptions);
export const checkAndSolveNext = checkAndSolveTemplate(applyStratsWithChains);

export default checkAndSolve;