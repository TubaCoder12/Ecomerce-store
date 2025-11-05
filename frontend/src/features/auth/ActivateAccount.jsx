import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { api, API } from "../../ApiRoute/ApiRoute";
import { errorToast ,sucessToast} from "../../Component/Helpers/Messages";

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🧩 useEffect triggered");
    console.log("📦 Token from URL:", token);

    const activateAccount = async () => {
      console.log("🚀 Activation request started...");
      try {
        const response = await api.post(API.SIGNUP, { token });


        console.log("✅ Response from backend:", response.data);

        if (response.data?.error) {
          errorToast(response.data.error);
        } else {
          sucessToast(response.data.message || "Account activated successfully!");
          navigate("/login");
        }
      } catch (error) {
        console.error("❌ Activation error:", error);
        errorToast("Activation failed: " + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      activateAccount();
    } else {
      console.log("⚠️ Token not found in URL");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p className="text-orange-500 font-semibold text-lg">
          Activating your account, please wait...
        </p>
      ) : (
        <p className="text-green-600 font-semibold text-lg">
          Process completed. Redirecting...
        </p>
      )}
    </div>
  );
};

export default ActivateAccount;
