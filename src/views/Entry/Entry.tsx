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
import { useTransition, animated, useSpring } from "react-spring";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "../../enums/breakpoint.enum";
import { useState } from "react";
import { Colors } from "../../enums/colors.enum";
import { Logo } from "../../components/Logo/Logo";

export const Entry: React.FC = () => {
  const { signUp, login, currentUser, isVisible } = useAuth();
  const [toggleAnimation, setToggleAnimation] = useState<boolean>(true);

  const isDesktop = useMediaQuery({
    query: `${Breakpoint.Desktop}`,
  });

  const mobileTransition = useTransition(isVisible, {
    from: { x: 0, y: 600, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: {
      position: "absolute",
      width: "380px",
      x: 1000,
      y: 0,
      opacity: 0.5,
    },
    expires: true,
    config: {
      duration: 600,
    },
  });

  const sideActionAnimation = useSpring({
    from: {
      width: "40%",
    },
    to: [
      {
        position: "absolute",
        left: toggleAnimation ? "60%" : "0%",
      },
    ],
    delay: 400,
    config: {
      duration: 450,
    },
  });

  const headingLoginTransition = useTransition(toggleAnimation, {
    from: { opacity: 0, x: 300, y: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    leave: {
      position: "absolute",
      x: 300,
      y: 0,
      opacity: 0,
    },
    delay: toggleAnimation ? 500 : 0,
    expires: true,
  });

  const headingSignUpTransition = useTransition(toggleAnimation, {
    from: { opacity: 0, x: -300, y: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    leave: {
      position: "absolute",
      x: -300,
      y: 0,
      opacity: 0,
    },
    delay: toggleAnimation ? 0 : 500,
    expires: true,
  });

  const buttonsTransition = useTransition(toggleAnimation, {
    from: { opacity: 0, x: 0, y: 500 },
    enter: {
      position: "absolute",
      opacity: 1,
      y: 325,
    },
    leave: { opacity: 0, x: 0, y: 400 },
    delay: 1000,
    expires: true,
  });
  const formAnimation = useSpring({
    from: {
      width: "60%",
    },
    to: [
      {
        position: "absolute",
        left: toggleAnimation ? "0%" : "40%",
      },
    ],
    delay: 400,
    config: {
      duration: 450,
    },
  });

  const formTransition = useTransition(toggleAnimation, {
    from: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    leave: {
      position: "absolute",
      x: 0,
      y: 0,
      opacity: 0,
    },
    delay: 550,
    expires: true,
    config: {
      duration: 100,
    },
  });

  const logoTransition = useTransition(toggleAnimation, {
    from: {
      opacity: 0,
      x: 20,
      y: 20,
    },
    enter: {
      position: "absolute",
      opacity: 1,
      zIndex: 2,
      x: 20,
      y: 20,
    },
    leave: {
      opacity: 0,
      x: 20,
      y: 20,
    },
    delay: toggleAnimation ? 400 : 800,
    config: {
      duration: 100,
    },
  });

  return (
    <>
      {isDesktop ? (
        <DesktopWrapper>
          {logoTransition((style, item) =>
            item ? (
              <animated.div style={style}>
                <Logo color={Colors.DarkerBlue} />
              </animated.div>
            ) : (
              <animated.div style={style}>
                <Logo color={Colors.White} />
              </animated.div>
            )
          )}

          <animated.div style={formAnimation}>
            <DesktopFormWrapper>
              {formTransition((style, item) =>
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
            </DesktopFormWrapper>
          </animated.div>

          <animated.div style={sideActionAnimation}>
            <SideAction>
              <SideBox>
                {headingLoginTransition(
                  (style, item) =>
                    item && (
                      <animated.div style={style}>
                        <Heading>Hello, Friend!</Heading>
                        <Description>
                          Enter your personal details and start journey with us
                        </Description>
                      </animated.div>
                    )
                )}
                {headingSignUpTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style}>
                        <Heading>Welcome Back!</Heading>
                        <Description>
                          To keep connected with us please login with your
                          personal info
                        </Description>
                      </animated.div>
                    )
                )}
                {buttonsTransition((style, item) =>
                  item ? (
                    <animated.div style={style}>
                      <StyledButton
                        width={200}
                        type="button"
                        variant="primary"
                        onClick={() => setToggleAnimation((prev) => !prev)}
                      >
                        Sign-up
                      </StyledButton>
                    </animated.div>
                  ) : (
                    <animated.div style={style}>
                      <StyledButton
                        width={200}
                        type="button"
                        variant="primary"
                        onClick={() => setToggleAnimation((prev) => !prev)}
                      >
                        Login
                      </StyledButton>
                    </animated.div>
                  )
                )}
              </SideBox>
            </SideAction>
          </animated.div>
        </DesktopWrapper>
      ) : (
        <MobileWrapper>
          <FormHero />
          <FormWrapper>
            {mobileTransition((style, item) =>
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
          </FormWrapper>
        </MobileWrapper>
      )}
      {currentUser && <Redirect to={Routes.Home} />}
    </>
  );
};
