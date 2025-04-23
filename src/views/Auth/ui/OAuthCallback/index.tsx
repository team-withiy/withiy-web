import { SSRSafeSuspense } from "@/shared/ui/SSRSafeSuspense";

import Callback from "./Callback";

const OAuthCallbackPage: React.FC = () => {
  return (
    <SSRSafeSuspense fallback={null}>
      <Callback />
    </SSRSafeSuspense>
  );
};

export default OAuthCallbackPage;
