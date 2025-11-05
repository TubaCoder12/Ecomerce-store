import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { api, API } from "../../ApiRoute/ApiRoute";
import { errorToast,sucessToast } from "../../Component/Helpers/Messages";

const AccessAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessAccount = async () => {
      try {
        // API call with Axios
        const response = await api.post(API.ACCESS, { token });


        if (response.data?.error) {
          errorToast(response.data.error);
        } else {
          sucessToast(response.data.message || "Token verified successfully!");
          navigate("/reset-password");
        }
      } catch (error) {
        console.error("Token verification error:", error);
        errorToast("Token is invalid or expired...");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      accessAccount();
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p className="text-orange-500 font-semibold text-lg">
          Verifying your token, please wait...
        </p>
      ) : (
        <p className="text-green-600 font-semibold text-lg">
          Process complete. Redirecting...
        </p>
      )}
    </div>
  );
};

export default AccessAccount;
