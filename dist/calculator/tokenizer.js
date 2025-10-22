import { exit } from "../core/io.js";
import { bracketTokens, precedence } from "./handler.js";
const resolvedOps = ["-", "+"];
export function tokenizeExpression(expr) {
    if (!expr)
        return [];
    const sanitizedExpr = expr.replace(/\s/g, "");
    const tokenizedExpr = [];
    let storedNum = "";
    for (let i = 0; i < sanitizedExpr.length; i++) {
        let char = sanitizedExpr[i];
        const lastToken = tokenizedExpr.at(-1);
        const isResolvableOp = lastToken &&
            char &&
            resolvedOps.includes(lastToken) &&
            resolvedOps.includes(char);
        const isNumber = !isNaN(Number(char));
        if (isNumber || char === ".") {
            storedNum += char;
        }
        else {
            if ((storedNum && !isResolvableOp) ||
                (!bracketTokens.includes(char) && !isResolvableOp)) {
                tokenizedExpr.push(Number(storedNum));
                storedNum = "";
            }
        }
        if (char && char in precedence) {
            let resolvedOp = char;
            if (resolvedOps.includes(char)) {
                const signPointMap = { "+": 0, "-": 1 };
                const lastToken = tokenizedExpr.at(-1);
                if (resolvedOps.includes(lastToken)) {
                    tokenizedExpr.pop();
                    const signVal = signPointMap[lastToken] ^
                        signPointMap[char];
                    for (let k in signPointMap) {
                        if (signPointMap[k] === Number(signVal)) {
                            resolvedOp = k;
                        }
                    }
                }
            }
            tokenizedExpr.push(resolvedOp);
        }
        if (bracketTokens.includes(char)) {
            const lastToken = tokenizedExpr.at(-1);
            if (typeof lastToken === "number" && char === "(") {
                tokenizedExpr.push("*");
            }
            tokenizedExpr.push(char);
        }
        if (i === sanitizedExpr.length - 1 && storedNum) {
            tokenizedExpr.push(Number(storedNum));
        }
    }
    return tokenizedExpr;
}
//# sourceMappingURL=tokenizer.js.map