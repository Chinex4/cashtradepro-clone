// useFetchLoggedInUser.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUser } from "../redux/user/userThunk";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useFetchLoggedInUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, loading } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return; // ⛔ Skip if not logged in

    dispatch(fetchLoggedInUser())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        navigate("/login");
      });
  }, [dispatch, navigate, accessToken]);

  return { user, error, loading };
};

export default useFetchLoggedInUser;
