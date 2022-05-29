import jwt, { VerifyErrors } from "jsonwebtoken";
import { Admin } from "../schema/admin.schema";
import { User } from "../schema/user.schema";

const publicKey = Buffer.from(process.env.PUBLIC_KEY!, "base64").toString(
  "ascii"
);
const privateKey = Buffer.from(process.env.PRIVATE_KEY!, "base64").toString(
  "ascii"
);

export function jwtValid(token: string): boolean {
  var isValid: boolean = false;
  jwt.verify(token, publicKey, (error, decode) => {
    if (error?.name === "TokenExpiredError") {
      isValid = true;
    } else {
      isValid = false;
    }
  });
  return isValid;
  //   try {
  //     console.log(dec);
  //     return false;
  //   } catch (error) {
  //     const err = error as VerifyErrors;
  //     console.log(err);
  //     if (err.name === "TokenExpiredError") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
}

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}

export interface VerificationTokenType {
  email: string;
  id: string;
}

export interface TokenType {
  user: string;
  role: User["type"] | Admin["type"] | undefined;
}
