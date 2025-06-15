import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";

import { getCoupleApi } from "@/entities/couple/api/couple.server";

const CoupleDetailPage: React.FC = async () => {
  const { data } = await getCoupleApi();
  return (
    <>
      couple hi
      {JSON.stringify(data)}
      <AuthorizationRouteHandler requiredAuth requiredCouple />
    </>
  );
};

export default CoupleDetailPage;
