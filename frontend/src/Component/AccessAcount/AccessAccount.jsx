import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Access } from "../../Hook/AccessHook";

const AccessAccount = () => {
  const { token } = useParams();
  const mutation = Access();

  useEffect(() => {
    if (token) {
      mutation.mutate(token);
    }
  }, [token]);

  return <>{mutation.isLoading && "loading ...."}</>;
};

export default AccessAccount;
