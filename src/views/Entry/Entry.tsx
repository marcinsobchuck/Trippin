import { AuthenticationForm } from "../../components/AuthenticationForm/AuthenticationForm";

import { Redirect } from "react-router-dom";
import { Routes } from "../../enums/routes.enum";
import { useAuth } from "../../hooks/useAuth";

export const Entry: React.FC = () => {
  const { signUp, login, currentUser } = useAuth();

  console.log(currentUser);
  return (
    <>
      <AuthenticationForm title="Login" buttonText="Login" onSubmit={login} />
      {/* <AuthenticationForm
        title="Sign-up"
        isRegisterForm
        buttonText="Sign-up"
        onSubmit={signUp}
      /> */}
      {currentUser && <Redirect to={Routes.Home} />}
    </>
  );
};
