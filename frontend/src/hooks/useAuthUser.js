import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const useAuthUser = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        setAuthUser(res.data?.user || null);
      } catch (error) {
        console.log("Error fetching auth user:", error);
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return {
    isLoading,
    isAuthenticated: Boolean(authUser),
  };
};

export default useAuthUser;
