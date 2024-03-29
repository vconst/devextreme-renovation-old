import * as React from "react";
import { useCallback, HTMLAttributes } from "react";

declare type RestProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof {
    height?: number;
    width?: number;
  }
>;
interface Widget {
  height?: number;
  width?: number;
  restAttributes: RestProps;
}

export default function Widget(
  props: {
    height?: number;
    width?: number;
  } & RestProps
) {
  const __restAttributes = useCallback(
    function __restAttributes(): RestProps {
      const { height, width, ...restProps } = props;
      return restProps;
    },
    [props]
  );

  return view1({
    ...props,
    restAttributes: __restAttributes(),
  });
}

function view1(viewModel: Widget) {
  return (
    <div style={{ height: viewModel.height }}>
      <span></span>

      <span></span>
    </div>
  );
}
