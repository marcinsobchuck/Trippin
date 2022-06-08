import React, { useState } from "react";

import {
  CopyIcon,
  CopyWrapper,
  Wrapper,
  SocialIcon,
  StyledEmail,
  TooltipText,
  Copyright,
} from "./Footer.styled";
import github from "src/assets/images/github.svg";
import linkedin from "src/assets/images/linkedin.svg";
import copy from "src/assets/images/copy.svg";

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Wrapper>
      <div>
        <a
          href='https://github.com/marcinsobchuck'
          target='_blank'
          rel='noreferrer'
        >
          <SocialIcon src={github} />
        </a>
        <a
          href='https://www.linkedin.com/in/marcin-sobczak-b66a0a1b5/'
          target='_blank'
          rel='noreferrer'
        >
          <SocialIcon src={linkedin} />
        </a>
      </div>
      <StyledEmail
        onClick={() => {
          setCopied(true);
          navigator.clipboard.writeText("marcinsobchuck@gmail.com");
        }}
        onMouseLeave={() => setCopied(false)}
      >
        <CopyWrapper>
          <CopyIcon src={copy} />
          <p>marcinsobchuck@gmail.com</p>
        </CopyWrapper>
        <TooltipText>{copied ? "Copied" : "Copy to clipboard"}</TooltipText>
      </StyledEmail>
      <Copyright>Created by Marcin Sobczak &copy;</Copyright>
    </Wrapper>
  );
};
