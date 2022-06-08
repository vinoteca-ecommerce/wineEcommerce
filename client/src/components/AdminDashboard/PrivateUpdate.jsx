import { Navigate } from "react-router-dom";

export function PrivateUpdate({children}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const getRole = function () {
      if (user && user.token) {
        return user.user.role;
      } else {
        return "NO_ROLE";
      }
    };
    let auxRole = getRole();
  
    function aux() {
      if (auxRole === "SALES_ROLE" || auxRole === "ADMIN_ROLE") {
        return true;
      } else {
        return false;
      }
    }
    let auth = aux();
  
    return auth ? children : <Navigate to="/" />;
}
