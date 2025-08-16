/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
export default ({ children, beforeChange }: { children: React.ReactNode; beforeChange?: () => void }) => (
  <div data-testid="slider" onClick={() => beforeChange && beforeChange()}>
    {children}
  </div>
);
