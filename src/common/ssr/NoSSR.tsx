import React from "react";

const useEnhancedEffect =
  //@ts-ignore
  typeof window !== "undefined" && process.env.NODE_ENV !== "test"
    ? React.useLayoutEffect
    : React.useEffect;

/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 * - Escape hatch for broken dependencies not supporting SSR.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can turn on service degradation.
 */
export function NoSSR({ children, defer = false, fallback = null }) {
  const [mountedState, setMountedState] = React.useState(false);

  useEnhancedEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  React.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  // We need the Fragment here to force react-docgen to recognise NoSsr as a component.
  return <React.Fragment>{mountedState ? children : fallback}</React.Fragment>;
}

export default NoSSR;

export interface NoSSRProps {
  children: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}
