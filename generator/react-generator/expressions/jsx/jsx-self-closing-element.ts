import { JsxOpeningElement } from "./jsx-opening-element";
import { toStringOptions } from "../../../base-generator/types";

export class JsxSelfClosingElement extends JsxOpeningElement {
  toString(options?: toStringOptions) {
    if (this.getTemplateProperty(options)) {
      return super.toString(options);
    }
    return `<${this.processTagName(this.tagName).toString(
      options
    )} ${this.attributesString(options)}/>`;
  }
}
