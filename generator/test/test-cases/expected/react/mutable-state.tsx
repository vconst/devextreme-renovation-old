function view(viewModel: Widget) {
  return <div></div>;
}

export declare type WidgetInputType = {};
const WidgetInput: WidgetInputType = {};
import * as React from "react";
import { useCallback, useEffect, useRef, HTMLAttributes } from "react";

declare type RestProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof typeof WidgetInput
>;
interface Widget {
  props: typeof WidgetInput & RestProps;
  setObj: () => any;
  getValue: () => any;
  getObj: () => any;
  restAttributes: RestProps;
}

export default function Widget(props: typeof WidgetInput & RestProps) {
  const obj = useRef<{ value?: number }>();
  const notDefinedObj = useRef<{ value?: number } | undefined>();
  const definedObj = useRef<{ value?: number }>({ value: 0 });

  const __setObj = useCallback(function __setObj(): any {
    obj.current!.value = 0;
    definedObj.current!.value = 0;
    notDefinedObj.current! = notDefinedObj.current! || {};
    notDefinedObj.current!.value = 0;
  }, []);
  const __getValue = useCallback(function __getValue(): any {
    const a: number = obj.current!.value ?? 0;
    const b: number = notDefinedObj.current?.value ?? 0;
    const c: number = definedObj.current!.value ?? 0;
    return a + b + c;
  }, []);
  const __getObj = useCallback(function __getObj(): any {
    return obj.current!;
  }, []);
  const __restAttributes = useCallback(
    function __restAttributes(): RestProps {
      const { ...restProps } = props;
      return restProps;
    },
    [props]
  );
  useEffect(() => {
    __setObj();
  }, []);

  return view({
    props: { ...props },
    setObj: __setObj,
    getValue: __getValue,
    getObj: __getObj,
    restAttributes: __restAttributes(),
  });
}

Widget.defaultProps = {
  ...WidgetInput,
};
