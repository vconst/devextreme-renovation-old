<template>
  <div style="display: contents"><slot></slot></div>
</template>
<script>
const WidgetInput = {};
export const DxWidget = {
  name: "Widget",
  props: WidgetInput,
  computed: {
    __restAttributes() {
      return {};
    },
    props() {
      return { children: this.$slots.default };
    },
  },
};
export default DxWidget;
</script>
