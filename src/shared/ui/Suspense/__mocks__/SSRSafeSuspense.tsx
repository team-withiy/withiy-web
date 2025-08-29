export const SSRSafeSuspense = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default Object.assign(SSRSafeSuspense, {
  with: <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => <Component {...props} />;
  },
});
