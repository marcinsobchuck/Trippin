import landscapeBarcelona from "../assets/landscapeBarcelona.jpg";
import portraitBarcelona from "../assets/portraitBarcelona.jpg";
import landscapeBudapest from "../assets/landscapeBudapest.jpg";
import portraitBudapest from "../assets/portraitBudapest.jpg";
import landscapeCopenhagen from "../assets/landscapeCopenhagen.jpg";
import portraitCopenhagen from "../assets/portraitCopenhagen.jpg";
import landscapeLondon from "../assets/landscapeLondon.jpg";
import portraitLondon from "../assets/portraitLondon.jpg";
import landscapeLosAngeles from "../assets/landscapeLosAngeles.jpg";
import portraitLosAngeles from "../assets/portraitLosAngeles.jpg";
import landscapeMoscow from "../assets/landscapeMoscow.jpg";
import portraitMoscow from "../assets/portraitMoscow.jpg";
import landscapeOslo from "../assets/landscapeOslo.jpg";
import portraitOslo from "../assets/portraitOslo.jpg";
import landscapeParis from "../assets/landscapeParis.jpg";
import portraitParis from "../assets/portraitParis.jpg";
import landscapeRome from "../assets/landscapeRome.jpg";
import portraitRome from "../assets/portraitRome.jpg";
import landscapeVenice from "../assets/landscapeVenice.jpg";
import portraitVenice from "../assets/portraitVenice.jpg";
import landscapeVienna from "../assets/landscapeVienna.jpg";
import portraitVienna from "../assets/portraitVienna.jpg";

export enum RecommendedPlaces {
  BARCELONA = "Barcelona",
  BUDAPEST = "Budapest",
  COPENHAGEN = "Copenhagen",
  LONDON = "London",
  LOSANGELES = "Los Angeles",
  MOSCOW = "Moscow",
  OSLO = "Oslo",
  PARIS = "Paris",
  ROME = "Rome",
  VENICE = "Venice",
  VIENNA = "Vienna",
}

export const RecommendedPlacesMap = new Map<
  RecommendedPlaces | string,
  { landscape: string; portrait: string }
>([
  [
    RecommendedPlaces.BARCELONA,
    { landscape: landscapeBarcelona, portrait: portraitBarcelona },
  ],
  [
    RecommendedPlaces.BUDAPEST,
    { landscape: landscapeBudapest, portrait: portraitBudapest },
  ],
  [
    RecommendedPlaces.COPENHAGEN,
    { landscape: landscapeCopenhagen, portrait: portraitCopenhagen },
  ],
  [
    RecommendedPlaces.LONDON,
    { landscape: landscapeLondon, portrait: portraitLondon },
  ],
  [
    RecommendedPlaces.LOSANGELES,
    { landscape: landscapeLosAngeles, portrait: portraitLosAngeles },
  ],
  [
    RecommendedPlaces.MOSCOW,
    { landscape: landscapeMoscow, portrait: portraitMoscow },
  ],
  [
    RecommendedPlaces.OSLO,
    { landscape: landscapeOslo, portrait: portraitOslo },
  ],
  [
    RecommendedPlaces.PARIS,
    { landscape: landscapeParis, portrait: portraitParis },
  ],
  [
    RecommendedPlaces.ROME,
    { landscape: landscapeRome, portrait: portraitRome },
  ],
  [
    RecommendedPlaces.VENICE,
    { landscape: landscapeVenice, portrait: portraitVenice },
  ],
  [
    RecommendedPlaces.VIENNA,
    { landscape: landscapeVienna, portrait: portraitVienna },
  ],
]);
