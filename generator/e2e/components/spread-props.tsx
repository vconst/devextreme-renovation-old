import { Component, JSXComponent } from "../../component_declaration/common";
import Button, { ButtonInput } from "./button";

function view(model: Widget) {
  return <Button {...(model.props as ButtonInput)} />;
}

@Component({ view })
export default class Widget extends JSXComponent(ButtonInput) {}
