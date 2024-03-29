import { toStringOptions } from "../../types";
import { GetAccessor as BaseGetAccessor } from "../../../base-generator/expressions/class-members";
import { compileMethod } from "./method";

export class GetAccessor extends BaseGetAccessor {
  toString(options?: toStringOptions): string {
    if (!options) {
      return super.toString();
    }
    return compileMethod(this, options);
  }
}
