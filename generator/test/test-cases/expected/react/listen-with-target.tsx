function viewModel() { }

function view() { }

import React, { useCallback, useEffect } from 'react';

interface Component {
  onPointerUp: () => void,
  scrollHandler: () => void
}
export function Component(props: {}) {
  const onPointerUp = useCallback(() => { }, []);
  const scrollHandler = useCallback(() => { }, []);
  useEffect(() => {
    document.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", scrollHandler);
    return function cleanup() {
      document.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  return view(viewModel({
    ...props,
    onPointerUp,
    scrollHandler
  }));
}