import { exit } from "../core/io.ts";
import { bracketTokens, precedence } from "./handler.ts";
import type {
  BracketToken,
  CalcOperator,
  ExpressionChar,
  ExpressionToken,
} from "../@types/index.ts";

export function tokenizeExpression(expr: string) {
  if (!expr) return [];

  const sanitizedExpr = expr.replace(/\s/g, "");

  const tokenizedExpr: ExpressionChar[] = [];

  let storedNum = "";

  for (let i = 0; i < sanitizedExpr.length; i++) {
    let char = sanitizedExpr[i];
    const lastToken = tokenizedExpr.at(-1);
    const isResolvableOp =
      lastToken && char && lastToken in precedence && char in precedence;
    const isNumber = !isNaN(Number(char));

    if (isNumber || char === ".") {
      storedNum += char;
    } else {
      if (
        (storedNum && !isResolvableOp) ||
        (!bracketTokens.includes(char as BracketToken) && !isResolvableOp)
      ) {
        tokenizedExpr.push(Number(storedNum));
        storedNum = "";
      }
    }

    if (char && char in precedence) {
      let resolvedOp = char;
      const resolvedOps = ["-", "+"] as const;
      type ResolvedOp = (typeof resolvedOps)[number];

      if (resolvedOps.includes(char as ResolvedOp)) {
        const signPointMap = { "+": 0, "-": 1 };
        const lastToken = tokenizedExpr.at(-1);

        if (resolvedOps.includes(lastToken as ResolvedOp)) {
          tokenizedExpr.pop();

          const signVal =
            signPointMap[lastToken as ResolvedOp] ^
            signPointMap[char as ResolvedOp];

          for (let k in signPointMap) {
            if (
              signPointMap[k as keyof typeof signPointMap] === Number(signVal)
            ) {
              resolvedOp = k;
            }
          }
        }
      }
      tokenizedExpr.push(resolvedOp as CalcOperator);
    }

    if (bracketTokens.includes(char as BracketToken)) {
      tokenizedExpr.push(char as BracketToken);
    }

    if (i === sanitizedExpr.length - 1 && storedNum) {
      tokenizedExpr.push(Number(storedNum));
    }
  }

  return tokenizedExpr;
}
