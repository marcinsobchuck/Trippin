import React from "react";
import { useAuth } from "src/hooks/useAuth";
import { StyledText, Wrapper } from "./AccountInformationModal.styled";
import { useModalAnimation } from "src/hooks/useModalAnimation";
import { animated } from "@react-spring/web";
import { Routes } from "src/enums/routes.enum";
import { menuItems } from "src/shared/config";

export const AccountInformationModal: React.FC<{
  showAccountInfoModal: boolean;
}> = ({ showAccountInfoModal }) => {
  const { logout, currentUser } = useAuth();

  const handleAuthAction = () => {
    currentUser && logout();
  };

  const accountInformationModalTransition =
    useModalAnimation(showAccountInfoModal);

  return accountInformationModalTransition(
    (styles, item) =>
      item && (
        <animated.div
          style={{
            ...styles,
            position: "absolute",
            zIndex: 2,
            top: 40,
            left: 0,
          }}
        >
          <Wrapper>
            {menuItems.map((item) => (
              <StyledText $isDisabled={!currentUser} to={item.route}>
                {item.text}
              </StyledText>
            ))}
            <StyledText
              to={!currentUser ? Routes.Entry : ""}
              onClick={handleAuthAction}
            >
              {currentUser ? "Sign out" : "Sign in"}
            </StyledText>
          </Wrapper>
        </animated.div>
      )
  );
};
