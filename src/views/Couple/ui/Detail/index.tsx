import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";

const CoupleDetailPage: React.FC = () => {
  return (
    <>
      couple hi
      <AuthorizationRouteHandler requiredAuth requiredCouple />
    </>
  );
};

export default CoupleDetailPage;
