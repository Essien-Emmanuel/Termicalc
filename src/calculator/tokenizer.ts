import { exit } from "../core/io.ts";
import { bracketTokens, precedence } from "./handler.ts";
import type {
  BracketToken,
  CalcOperator,
  ExpressionChar,
} from "../@types/index.ts";

const resolvedOps = ["-", "+"] as const;
type ResolvedOp = (typeof resolvedOps)[number];

export function tokenizeExpression(expr: string) {
  if (!expr) return [];

  const sanitizedExpr = expr.replace(/\s/g, "");

  const tokenizedExpr: ExpressionChar[] = [];

  let storedNum = "";

  for (let i = 0; i < sanitizedExpr.length; i++) {
    let char = sanitizedExpr[i];
    const lastToken = tokenizedExpr.at(-1);
    const isResolvableOp =
      lastToken &&
      char &&
      resolvedOps.includes(lastToken as ResolvedOp) &&
      resolvedOps.includes(char as ResolvedOp);
    const isNumber = !isNaN(Number(char));

    // console.log({ tokenizedExpr, isResolvableOp, storedNum, char });
    if (isNumber || char === ".") {
      storedNum += char;
    } else {
      // if (
      //   (storedNum && !isResolvableOp) ||
      //   (!bracketTokens.includes(char as BracketToken) && !isResolvableOp)
      // ) {
      //   tokenizedExpr.push(Number(storedNum));
      //   storedNum = "";
      // }

      if (
        storedNum ||
        (storedNum && !isResolvableOp) ||
        (!bracketTokens.includes(char as BracketToken) && !isResolvableOp)
      ) {
        tokenizedExpr.push(Number(storedNum));
        storedNum = "";
      }
    }

    if (char && char in precedence) {
      let resolvedOp = char;

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
      const lastToken = tokenizedExpr.at(-1);
      if (typeof lastToken === "number" && char === "(") {
        tokenizedExpr.push("*");
      }
      tokenizedExpr.push(char as BracketToken);
    }

    if (i === sanitizedExpr.length - 1 && storedNum) {
      tokenizedExpr.push(Number(storedNum));
    }
  }

  return tokenizedExpr;
}
