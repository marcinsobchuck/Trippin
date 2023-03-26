import { RecommendedPlaces } from "src/enums/recommendedPlaces.enum";
import barcelonaImage from "src/assets/images/barcelonaImage.jpg";
import copenhagenImage from "src/assets/images/copenhagenImage.jpg";
import budapestImage from "src/assets/images/budapestImage.jpg";
import londonImage from "src/assets/images/londonImage.jpg";
import losAngelesImage from "src/assets/images/losAngelesImage.jpg";
import osloImage from "src/assets/images/osloImage.jpg";
import parisImage from "src/assets/images/parisImage.jpg";
import romeImage from "src/assets/images/romeImage.jpg";
import veniceImage from "src/assets/images/veniceImage.jpg";
import viennaImage from "src/assets/images/viennaImage.jpg";

export const recommendedPlacesArray = [
  {
    id: "barcelona_es",
    place_key: "views.home.recommended.barcelona",
    place: RecommendedPlaces.BARCELONA,
    inputText: "",
    image: barcelonaImage,
  },
  {
    id: "copenhagen_dk",
    place_key: "views.home.recommended.copenhagen",
    place: RecommendedPlaces.COPENHAGEN,
    inputText: "",
    image: copenhagenImage,
  },
  {
    id: "london_gb",
    place_key: "views.home.recommended.london",
    place: RecommendedPlaces.LONDON,
    inputText: "",
    image: londonImage,
  },
  {
    id: "los-angeles_ca_us",
    place_key: "views.home.recommended.los angeles",
    place: RecommendedPlaces.LOSANGELES,
    inputText: "",
    image: losAngelesImage,
  },
  {
    id: "budapest_hu",
    place_key: "views.home.recommended.budapest",
    place: RecommendedPlaces.BUDAPEST,
    inputText: "",
    image: budapestImage,
  },
  {
    id: "oslo_no",
    place_key: "views.home.recommended.oslo",
    place: RecommendedPlaces.OSLO,
    inputText: "",
    image: osloImage,
  },
  {
    id: "paris_fr",
    place_key: "views.home.recommended.paris",
    place: RecommendedPlaces.PARIS,
    inputText: "",
    image: parisImage,
  },
  {
    id: "rome_it",
    place_key: "views.home.recommended.rome",
    place: RecommendedPlaces.ROME,
    inputText: "",

    image: romeImage,
  },
  {
    id: "venice_it",
    place_key: "views.home.recommended.venice",
    place: RecommendedPlaces.VENICE,
    inputText: "",
    image: veniceImage,
  },
  {
    id: "vienna_at",
    place_key: "views.home.recommended.vienna",
    place: RecommendedPlaces.VIENNA,
    inputText: "",
    image: viennaImage,
  },
];
