import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useActivatedAccount } from "../../Hook/ActivedHook";

const ActivateAccount = () => {
  const { token } = useParams();
  const mutation = useActivatedAccount();

  useEffect(() => {
    if (token) {
      mutation.mutate(token);
    }
  }, [token]);

  return <>{mutation.isLoading && "loading ...."}</>;
};

export default ActivateAccount;
