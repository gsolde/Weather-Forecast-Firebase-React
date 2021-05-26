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

export function deleteFavoriteCityFromFirebase(cityId, user) {
  firebaseApp.database().ref(`favoriteCities/${user.uid}/${cityId}`).remove();
}

export function getCityFirebaseID(favoriteCitiesList, report) {
  let cityId = Object.keys(favoriteCitiesList).reduce((cityId, favCityId) => {
    if (favoriteCitiesList[favCityId].label === report.municipio.NOMBRE) {
      cityId = favCityId;
    }
    return cityId;
  }, "");
  return cityId;
}

export function getCityDetails(report) {
  return {
    label: report.municipio.NOMBRE,
    cod_prov: report.municipio.CODPROV,
    id: report.municipio.CODIGOINE.slice(0, 5),
  };
}
