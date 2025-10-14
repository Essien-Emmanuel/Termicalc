import { exit } from "../core/io.ts";
import { bracketTokens, precedence } from "./handler.ts";
import type {
  BracketToken,
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
    const isNumber = !isNaN(Number(char));
    if (isNumber) {
      storedNum += char;
    } else {
      tokenizedExpr.push(Number(storedNum));
      storedNum = "";
    }

    if (
      (char && char in precedence) ||
      bracketTokens.includes(char as BracketToken)
    ) {
      tokenizedExpr.push(char as BracketToken);
    }

    if (i === sanitizedExpr.length - 1) {
      tokenizedExpr.push(Number(storedNum));
    }
  }

  return tokenizedExpr;
}
