import landscapeBarcelona from "src/assets/images/landscapeBarcelona.jpg";
import portraitBarcelona from "src/assets/images/portraitBarcelona.jpg";
import landscapeBudapest from "src/assets/images/landscapeBudapest.jpg";
import portraitBudapest from "src/assets/images/portraitBudapest.jpg";
import landscapeCopenhagen from "src/assets/images/landscapeCopenhagen.jpg";
import portraitCopenhagen from "src/assets/images/portraitCopenhagen.jpg";
import landscapeLondon from "src/assets/images/landscapeLondon.jpg";
import portraitLondon from "src/assets/images/portraitLondon.jpg";
import landscapeLosAngeles from "src/assets/images/landscapeLosAngeles.jpg";
import portraitLosAngeles from "src/assets/images/portraitLosAngeles.jpg";
import landscapeMoscow from "src/assets/images/landscapeMoscow.jpg";
import portraitMoscow from "src/assets/images/portraitMoscow.jpg";
import landscapeOslo from "src/assets/images/landscapeOslo.jpg";
import portraitOslo from "src/assets/images/portraitOslo.jpg";
import landscapeParis from "src/assets/images/landscapeParis.jpg";
import portraitParis from "src/assets/images/portraitParis.jpg";
import landscapeRome from "src/assets/images/landscapeRome.jpg";
import portraitRome from "src/assets/images/portraitRome.jpg";
import landscapeVenice from "src/assets/images/landscapeVenice.jpg";
import portraitVenice from "src/assets/images/portraitVenice.jpg";
import landscapeVienna from "src/assets/images/landscapeVienna.jpg";
import portraitVienna from "src/assets/images/portraitVienna.jpg";

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
