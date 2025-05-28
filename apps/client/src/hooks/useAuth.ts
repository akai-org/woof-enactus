import { useEffect, useState } from "react";

//TODO: complete authentication logic
function useAuth() {
  const [isLogged, setisLogged] = useState(false);
  useEffect(() => {
    // fetch(`/api/auth`).then(res => setisLogged(res.status == 200));
  }, []);

  return isLogged;
}

export default useAuth;
