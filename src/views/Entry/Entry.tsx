import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { animated } from 'react-spring';

import { FormHero } from '../../components/FormHero/FormHero';
import { Logo } from '../../components/Logo/Logo';
import { Breakpoint } from '../../enums/breakpoint.enum';
import { Colors } from '../../enums/colors.enum';
import { useAnimations } from '../../hooks/useAnimations';
import { useAuth } from '../../hooks/useAuth';

import { AuthenticationForm } from './components/AuthenticationForm/AuthenticationForm';
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
} from './Entry.styled';

export const Entry: React.FC = () => {
  const { signUp, login } = useAuth();

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

  const { t } = useTranslation();

  if (isDesktop) {
    return (
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
          ),
        )}

        <animated.div style={formAnimation}>
          <DesktopFormWrapper>
            {formTransition((style, item) =>
              item ? (
                <animated.div style={style}>
                  <AuthenticationForm
                    title={t('views.entry.labels.login')}
                    buttonText={t('views.entry.buttons.login')}
                    onSubmit={login}
                  />
                </animated.div>
              ) : (
                <animated.div style={style}>
                  <AuthenticationForm
                    title={t('views.entry.labels.signUp')}
                    isRegisterForm
                    buttonText={t('views.entry.buttons.signUp')}
                    onSubmit={signUp}
                  />
                </animated.div>
              ),
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
                      <Heading>{t('views.entry.text.hello')}</Heading>
                      <Description>{t('views.entry.text.enterDetails')}</Description>
                    </animated.div>
                  ),
              )}
              {headingSignUpTransition(
                (style, item) =>
                  !item && (
                    <animated.div style={style}>
                      <Heading>{t('views.entry.text.welcomeBack')}</Heading>
                      <Description>{t('views.entry.text.keepConnected')}</Description>
                    </animated.div>
                  ),
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
                      {t('views.entry.buttons.signUp')}
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
                      {t('views.entry.buttons.login')}
                    </StyledButton>
                  </animated.div>
                ),
              )}
            </SideBox>
          </SideAction>
        </animated.div>
      </DesktopWrapper>
    );
  }

  return (
    <MobileWrapper>
      <FormHero />
      <FormWrapper>
        {mobileTransition((style, item) =>
          item ? (
            <animated.div style={style}>
              <AuthenticationForm
                title={t('views.entry.labels.login')}
                buttonText={t('views.entry.buttons.login')}
                onSubmit={login}
                handleToggleMobileAnimation={handleToggleMobileAnimation}
              />
            </animated.div>
          ) : (
            <animated.div style={style}>
              <AuthenticationForm
                title={t('views.entry.labels.signUp')}
                isRegisterForm
                buttonText={t('views.entry.buttons.signUp')}
                onSubmit={signUp}
                handleToggleMobileAnimation={handleToggleMobileAnimation}
              />
            </animated.div>
          ),
        )}
      </FormWrapper>
    </MobileWrapper>
  );
};
