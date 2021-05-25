import { firebaseApp } from "../config/firebase";

export function pushFavoriteCityToFirebase(report, user) {
  firebaseApp
    .database()
    .ref("favoriteCities")
    .child(user.uid)
    .push({
      label: report.municipio.NOMBRE,
      cod_prov: report.municipio.CODPROV,
      id: report.municipio.CODIGOINE.slice(0, 5),
    });
}

export function addFavoriteCityToStore(report) {
  return {
    label: report.municipio.NOMBRE,
    cod_prov: report.municipio.CODPROV,
    id: report.municipio.CODIGOINE.slice(0, 5),
  };
}
