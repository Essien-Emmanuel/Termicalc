import { exit } from "../core/io.ts";
import { bracketTokens, precedence } from "./handler.ts";
import type {
  BracketToken,
  CalcOperator,
  ExpressionChar,
} from "../@types/index.ts";
import { printSyntaxError } from "../exceptions/index.ts";

const resolvedOps = ["-", "+"] as const;
type ResolvedOp = (typeof resolvedOps)[number];

export function tokenizeExpression(expr: string) {
  if (!expr) return [];

  const sanitizedExpr = expr.replace(/\s/g, "");

  const tokenizedExpr: ExpressionChar[] = [];

  let storedNum = "";
  let isOpenBracket = false;
  let decimalPointCount = 0;

  for (let i = 0; i < sanitizedExpr.length; i++) {
    let char = sanitizedExpr[i];
    const isNumber = !isNaN(Number(char));

    const validChar =
      (
        [".", ...Object.keys(precedence), ...bracketTokens] as ExpressionChar[]
      ).includes(char as ExpressionChar) || isNumber;

    if (!validChar) {
      printSyntaxError(expr, `Invalid character ${char}`);
      exit();
    }
    if (decimalPointCount > 1) {
      printSyntaxError(
        expr,
        `Operand contains many decimal points ${storedNum}`
      );
      exit();
    }

    const lastToken = tokenizedExpr.at(-1);
    const isResolvableOp =
      lastToken &&
      char &&
      lastToken in precedence &&
      resolvedOps.includes(char as ResolvedOp);

    const isMissingOperand =
      lastToken &&
      char &&
      lastToken in precedence &&
      ["^", "/", "*"].includes(char as CalcOperator);

    // console.log({ tokenizedExpr, isResolvableOp, storedNum, char });
    if (isNumber || char === ".") {
      if (char === ".") {
        if (!storedNum) {
          storedNum += "0";
        }
        decimalPointCount++;
      }
      storedNum += char;
    } else {
      if (
        storedNum ||
        (storedNum && !isResolvableOp) ||
        (!bracketTokens.includes(char as BracketToken) &&
          !isResolvableOp &&
          !isMissingOperand)
      ) {
        tokenizedExpr.push(Number(storedNum));
        storedNum = "";
        decimalPointCount = 0;

        if (isOpenBracket) {
          tokenizedExpr.push(")");
          isOpenBracket = false;
        }
      }
    }

    if (char && char in precedence) {
      let resolvedOp = char;

      const lastToken = tokenizedExpr.at(-1);
      if (resolvedOps.includes(char as ResolvedOp)) {
        const signPointMap = { "+": 0, "-": 1 };

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
        } else if (
          lastToken &&
          ["^", "*", "/"].includes(lastToken as CalcOperator)
        ) {
          tokenizedExpr.push("(");
          tokenizedExpr.push(0);
          isOpenBracket = true;
        }
      } else {
        if (
          resolvedOps.includes(lastToken as ResolvedOp) &&
          ["^", "*", "/"].includes(char as CalcOperator)
        ) {
          printSyntaxError(expr, `Missing operand before ${char}`);
          exit();
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
      if (isOpenBracket) {
        tokenizedExpr.push(")");
      }
    }
  }

  return tokenizedExpr;
}
