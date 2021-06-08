import {
  BaseInfernoComponent,
  InfernoComponent,
  InfernoWrapperComponent,
  normalizeStyles,
} from "@devextreme/vdom";
function view() {
  return <div></div>;
}

export declare type NestedPropsType = {
  oneWay?: boolean;
  twoWay?: boolean;
  defaultTwoWay: boolean;
  twoWayChange?: (twoWay?: boolean) => void;
};
export const NestedProps: NestedPropsType = {
  oneWay: false,
  defaultTwoWay: false,
  twoWayChange: () => {},
};
export declare type WidgetPropsType = {
  nested?: typeof NestedProps;
};
export const WidgetProps: WidgetPropsType = {};
import {
  convertRulesToOptions,
  Rule,
} from "../../../../jquery-helpers/default_options";
import { createElement as h } from "inferno-compat";
declare type RestProps = {
  className?: string;
  style?: { [name: string]: any };
  key?: any;
  ref?: any;
};

export default class Widget extends BaseInfernoComponent<any> {
  state = {};
  refs: any;

  constructor(props: any) {
    super(props);
  }

  get restAttributes(): RestProps {
    const { nested, ...restProps } = this.props as any;
    return restProps;
  }

  render() {
    const props = this.props;
    return view();
  }
}

function __createDefaultProps() {
  return {
    ...WidgetProps,
    ...convertRulesToOptions<typeof WidgetProps>([
      { device: true, options: { nested: { oneWay: true } } },
    ]),
  };
}
Widget.defaultProps = __createDefaultProps();

type WidgetOptionRule = Rule<typeof WidgetProps>;

const __defaultOptionRules: WidgetOptionRule[] = [];
export function defaultOptions(rule: WidgetOptionRule) {
  __defaultOptionRules.push(rule);
  Widget.defaultProps = {
    ...__createDefaultProps(),
    ...convertRulesToOptions<typeof WidgetProps>(__defaultOptionRules),
  };
}