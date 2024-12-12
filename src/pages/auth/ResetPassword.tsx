import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  return (
    <div>
      <p>Hello, ResetPassword!</p>
    </div>
  );
};

export default ResetPassword;
