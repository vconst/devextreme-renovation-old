import {
  Component,
  OneWay,
  ComponentBindings,
  JSXComponent,
} from "../../component_declaration/common";

function view(model: SimpleComponent) {
  return (
    <div
      id="simple"
      style={{
        backgroundColor: model.props.color,
        width: model.props.width,
        height: model.props.height,
      }}
    ></div>
  );
}

@ComponentBindings()
export class WidgetInput {
  @OneWay() height: number = 10;
  @OneWay() width: number = 10;
  @OneWay() color?: string = "red";
}

@Component({
  view,
})
export class SimpleComponent extends JSXComponent(WidgetInput) {}
