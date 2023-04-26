import React, { useState } from 'react';

import { Colors } from 'src/enums/colors.enum';

import { Icon } from '../Icon/Icon';

import {
  CopyWrapper,
  Copyright,
  SocialIcon,
  StyledEmail,
  StyledLink,
  TooltipText,
  Wrapper,
} from './Footer.styled';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Wrapper>
      <div>
        <StyledLink href="https://github.com/marcinsobchuck" target="_blank" rel="noreferrer">
          <SocialIcon name="githubIcon" width={32} height={32} fill={Colors.White} />
        </StyledLink>
        <StyledLink
          href="https://www.linkedin.com/in/marcin-sobczak-b66a0a1b5/"
          target="_blank"
          rel="noreferrer"
        >
          <SocialIcon name="linkedinIcon" width={32} height={32} fill={Colors.White} />
        </StyledLink>
      </div>
      <StyledEmail
        onClick={() => {
          navigator.clipboard
            .writeText('marcinsobchuck@gmail.com')
            .then(() => setCopied(true))
            .catch(() => setCopied(false));
        }}
        onMouseLeave={() => setCopied(false)}
      >
        <CopyWrapper>
          <Icon name="copyIcon" width={18} height={18} fill={Colors.White} />
          <p>marcinsobchuck@gmail.com</p>
        </CopyWrapper>
        <TooltipText>{copied ? 'Copied' : 'Copy to clipboard'}</TooltipText>
      </StyledEmail>
      <Copyright>Created by Marcin Sobczak &copy;</Copyright>
    </Wrapper>
  );
};
