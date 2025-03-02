import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userslice/apiCalls";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const useCheckToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogOut = () => {
      logout(dispatch);
      toast.success("Session terminated, Sign in again please");
    };

    const token = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const getToken = JSON.parse(token)?.currentUser?.token;

    if (getToken) {
      const decodedToken = jwtDecode(getToken); // 🟢 Fix: Decode the correct token

      if (decodedToken.exp < Date.now() / 1000) {
        handleLogOut();
      }
    }
  }, [dispatch]); // ✅ Dependency array
};

export default useCheckToken;
