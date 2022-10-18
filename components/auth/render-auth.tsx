import { useAppSelector } from "@hooks/store";

function RenderAuth({ children, onAuth }: { children: any; onAuth: boolean }) {
  var user = useAppSelector((state) => state.user.data);
  var authSuccess = user?.email && user?.username;
  var authFailure = !user?.email || !user?.username;

  if (onAuth && authSuccess) return children;
  if (!onAuth && authFailure) return children;
  return null;
}

export default RenderAuth;
