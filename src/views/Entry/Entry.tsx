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
import { animated } from "react-spring";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "../../enums/breakpoint.enum";
import { Colors } from "../../enums/colors.enum";
import { Logo } from "../../components/Logo/Logo";
import { useAnimations } from "../../hooks/useAnimations";

export const Entry: React.FC = () => {
  const { signUp, login, currentUser } = useAuth();

  const isDesktop = useMediaQuery({
    query: `${Breakpoint.Desktop}`,
  });

  const {
    mobileTransition,
    sideActionAnimation,
    headingLoginTransition,
    headingSignUpTransition,
    buttonsTransition,
    formAnimation,
    formTransition,
    logoTransition,
    handleToggleDesktopAnimation,
    handleToggleMobileAnimation,
  } = useAnimations();

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
                        onClick={handleToggleDesktopAnimation}
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
                        onClick={handleToggleDesktopAnimation}
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
                    handleToggleMobileAnimation={handleToggleMobileAnimation}
                  />
                </animated.div>
              ) : (
                <animated.div style={style}>
                  <AuthenticationForm
                    title="Sign-up"
                    isRegisterForm
                    buttonText="Sign-up"
                    onSubmit={signUp}
                    handleToggleMobileAnimation={handleToggleMobileAnimation}
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
