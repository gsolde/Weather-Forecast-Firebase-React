import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};
const citiesUrl = "https://www.el-tiempo.net/api/json/v2/municipios";

export const fetchCities = createAsyncThunk("availableCities/fetchCities", async () => {
  const res = await fetch(citiesUrl);
  const cities = await res.json();
  return cities;
});

export const appSlice = createSlice({
  name: "availableCities",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "success";
        state.citiesList = action.payload.reduce((res, city) => {
          res = [...res, { label: city.NOMBRE, codProv: city.CODPROV, id: city.ID_REL }];
          return res.sort((a, b) => (a.label > b.label ? 1 : -1));
        }, []);
      })
      .addCase(fetchCities.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCities = (state) => state.availableCities.citiesList;
export default appSlice.reducer;
