import { AuthenticationForm } from "../../components/AuthenticationForm/AuthenticationForm";

import { Redirect, useHistory } from "react-router-dom";
import { Routes } from "../../enums/routes.enum";
import { useAuth } from "../../hooks/useAuth";

export const Entry = () => {
  const { signUp, login, setIsFirstEntry, currentUser } = useAuth();
  const history = useHistory();

  const continueAsGuest = () => {
    setIsFirstEntry(false);
    history.push(Routes.Home);
  };
  console.log(currentUser);
  return (
    <div>
      <div>Login Form</div>
      <AuthenticationForm buttonText="Login" onSubmit={login} />
      <div>Sign-up Form</div>
      <AuthenticationForm buttonText="Sign-up" onSubmit={signUp} />
      <button onClick={continueAsGuest}>Continue as a guest</button>
      {currentUser && <Redirect to={Routes.Home} />}
    </div>
  );
};
