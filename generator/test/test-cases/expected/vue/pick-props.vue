<template>
  <div>{{ data === undefined || data === null ? undefined : data.value }}</div>
</template>
<script>
import Props from "./component-bindings-only";
const WidgetProps = {
  data: {
    default() {
      return typeof Props.data.default === "function"
        ? Props.data.default()
        : Props.data.default;
    },
  },
  info: {
    default() {
      return typeof Props.info.default === "function"
        ? Props.info.default()
        : Props.info.default;
    },
  },
};
export const DxWidget = {
  name: "Widget",
  props: WidgetProps,
  data() {
    return {
      innerData: { value: "" },
    };
  },
  computed: {
    __restAttributes() {
      return {};
    },
    props() {
      return { data: this.data, info: this.info };
    },
  },
};
export default DxWidget;
</script>
