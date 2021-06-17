import { AuthenticationForm } from "../../components/AuthenticationForm/AuthenticationForm";
import { Redirect } from "react-router-dom";
import { Routes } from "../../enums/routes.enum";
import { useAuth } from "../../hooks/useAuth";
import {
  Description,
  DesktopFormWrapper,
  DesktopWrapper,
  FormWrapper,
  Heading,
  MobileWrapper,
  SideAction,
  SideBox,
  StyledButton,
} from "./Entry.styled";
import { FormHero } from "../../components/FormHero/FormHero";
import { useTransition, animated } from "react-spring";

export const Entry: React.FC = () => {
  const { signUp, login, currentUser, isVisible, handleToggleVisibility } =
    useAuth();

  const transition = useTransition(isVisible, {
    from: { x: 0, y: 600, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: {
      position: "absolute",
      width: "320px",
      x: 1000,
      y: 0,
      opacity: 0.5,
    },
    expires: true,
    config: {
      duration: 600,
    },
  });

  return (
    <>
      <MobileWrapper>
        <FormHero />
        <FormWrapper>
          {transition((style, item) =>
            item ? (
              <animated.div style={style}>
                <AuthenticationForm
                  title="Login"
                  buttonText="Login"
                  onSubmit={login}
                />
              </animated.div>
            ) : (
              <animated.div style={style}>
                <AuthenticationForm
                  title="Sign-up"
                  isRegisterForm
                  buttonText="Sign-up"
                  onSubmit={signUp}
                />
              </animated.div>
            )
          )}

          {currentUser && <Redirect to={Routes.Home} />}
        </FormWrapper>
      </MobileWrapper>
      <DesktopWrapper>
        <DesktopFormWrapper>
          <AuthenticationForm
            title="Login"
            buttonText="Login"
            onSubmit={login}
          />
        </DesktopFormWrapper>
        <SideAction>
          <SideBox>
            <Heading>Hello, Friend!</Heading>
            <Description>
              Enter your personal details and start journey with us
            </Description>
            <StyledButton
              width={200}
              type="button"
              variant="primary"
              onClick={handleToggleVisibility}
            >
              Sign-up
            </StyledButton>
          </SideBox>
        </SideAction>
        {/* <AuthenticationForm
          title="Sign-up"
          isRegisterForm
          buttonText="Sign-up"
          onSubmit={signUp}
        /> */}
      </DesktopWrapper>
    </>
  );
};
