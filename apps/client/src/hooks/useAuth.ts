import { useState } from "react";

const useAuth = () => {
  const [isLogged, setisLogged] = useState(false);
  fetch("/api/auth").then(res => setisLogged(res.status == 200));
  return isLogged;
};

export default useAuth;
