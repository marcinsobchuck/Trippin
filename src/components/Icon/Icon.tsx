import adultIcon from 'src/assets/images/adult.svg';
import airplaneIcon from 'src/assets/images/airplane.svg';
import arrowIcon from 'src/assets/images/arrow.svg';
import burgerIcon from 'src/assets/images/burger.svg';
import childIcon from 'src/assets/images/child.svg';
import cityIcon from 'src/assets/images/city.svg';
import closeIcon from 'src/assets/images/close.svg';
import copyIcon from 'src/assets/images/copy.svg';
import countryIcon from 'src/assets/images/country.svg';
import dollarImage from 'src/assets/images/dollar.png';
import euroImage from 'src/assets/images/euro.png';
import githubIcon from 'src/assets/images/github.svg';
import globeIcon from 'src/assets/images/globe.svg';
import infantIcon from 'src/assets/images/infant.svg';
import linkedinIcon from 'src/assets/images/linkedin.svg';
import logoIcon from 'src/assets/images/logo.svg';
import minusIcon from 'src/assets/images/minus.svg';
import planetEarthImage from 'src/assets/images/planetEarthIcon.png';
import plusIcon from 'src/assets/images/plus.svg';
import polishFlagImage from 'src/assets/images/polishFlag.png';
import poundImage from 'src/assets/images/pound.png';
import rarrowIcon from 'src/assets/images/rarrow.svg';
import signInImage from 'src/assets/images/signin.png';
import signOutImage from 'src/assets/images/signout.png';
import sortFilterIcon from 'src/assets/images/sortfilter.svg';
import tickIcon from 'src/assets/images/tick.svg';
import usaFlagImage from 'src/assets/images/usaFlag.png';
import userIcon from 'src/assets/images/user.svg';
import zlotyImage from 'src/assets/images/zloty.png';

import { StyledIMG, StyledSVG } from './Icon.styled';
import { IconProps } from './Icon.types';

export const Icon: React.FC<IconProps> = ({ name, width, height, fill, color, src, alt, ...props }) => {
  const SVGProps = {
    fill,
    color,
    width,
    height,
    ...props,
  };

  const IMGProps = {
    width,
    height,
    ...props,
  };

  const Icons: Record<IconProps['name'], any> = {
    adultIcon: <StyledSVG src={adultIcon} {...SVGProps} />,
    airplaneIcon: <StyledSVG src={airplaneIcon} {...SVGProps} />,
    arrowIcon: <StyledSVG src={arrowIcon} {...SVGProps} />,
    burgerIcon: <StyledSVG src={burgerIcon} {...SVGProps} />,
    childIcon: <StyledSVG src={childIcon} {...SVGProps} />,
    cityIcon: <StyledSVG src={cityIcon} {...SVGProps} />,
    closeIcon: <StyledSVG src={closeIcon} {...SVGProps} />,
    copyIcon: <StyledSVG src={copyIcon} {...SVGProps} />,
    countryIcon: <StyledSVG src={countryIcon} {...SVGProps} />,
    githubIcon: <StyledSVG src={githubIcon} {...SVGProps} />,
    globeIcon: <StyledSVG src={globeIcon} {...SVGProps} />,
    infantIcon: <StyledSVG src={infantIcon} {...SVGProps} />,
    linkedinIcon: <StyledSVG src={linkedinIcon} {...SVGProps} />,
    logoIcon: <StyledSVG src={logoIcon} {...SVGProps} />,
    minusIcon: <StyledSVG src={minusIcon} {...SVGProps} />,
    plusIcon: <StyledSVG src={plusIcon} {...SVGProps} />,
    rarrowIcon: <StyledSVG src={rarrowIcon} {...SVGProps} />,
    sortFilterIcon: <StyledSVG src={sortFilterIcon} {...SVGProps} />,
    tickIcon: <StyledSVG src={tickIcon} {...SVGProps} />,
    userIcon: <StyledSVG src={userIcon} {...SVGProps} />,

    polishFlagImage: <StyledIMG src={polishFlagImage} alt="polish flag" {...IMGProps} />,
    dollarImage: <StyledIMG src={dollarImage} alt="dollar" {...IMGProps} />,
    euroImage: <StyledIMG src={euroImage} alt="euro" {...IMGProps} />,
    planetEarthImage: <StyledIMG src={planetEarthImage} alt="earth icon" {...IMGProps} />,
    poundImage: <StyledIMG src={poundImage} alt="pound" {...IMGProps} />,
    signInImage: <StyledIMG src={signInImage} alt="signin" {...IMGProps} />,
    signOutImage: <StyledIMG src={signOutImage} alt="signout" {...IMGProps} />,
    usaFlagImage: <StyledIMG src={usaFlagImage} alt="usa flag" {...IMGProps} />,
    zlotyImage: <StyledIMG src={zlotyImage} alt="zloty" {...IMGProps} />,
    customImage: <StyledIMG src={src} alt={alt} {...IMGProps} />,
  };

  return Icons[name];
};
