import { InfernoComponent } from "../../../../modules/inferno/base_component";
function view() {
  return <div></div>;
}

export declare type WidgetPropsType = {};
export const WidgetProps: WidgetPropsType = {};
import {
  convertRulesToOptions,
  Rule,
} from "../../../../component_declaration/default_options";
import { createElement as h } from "inferno-compat";
declare type RestProps = {
  className?: string;
  style?: { [name: string]: any };
  key?: any;
  ref?: any;
};

export default class Widget extends InfernoComponent<
  typeof WidgetProps & RestProps
> {
  state = {};
  refs: any;

  constructor(props: typeof WidgetProps & RestProps) {
    super(props);
  }

  get restAttributes(): RestProps {
    const { ...restProps } = this.props;
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
      { device: true, options: {} },
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
