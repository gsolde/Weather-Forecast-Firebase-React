import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { weatherReports: [] };

export const fetchWeatherReports = createAsyncThunk("weatherReports/fetchWeatherReports", async (cityDetails) => {
  const res = await fetch(
    `https://www.el-tiempo.net/api/json/v2/provincias/${cityDetails.cod_prov}/municipios/${cityDetails.id}`
  );
  const weatherReports = await res.json();
  return weatherReports;
});

export const searchBarSlice = createSlice({
  name: "weatherReports",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherReports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherReports.fulfilled, (state, action) => {
        state.status = "success";
        state.weatherReports = state.weatherReports.some(
          (weatherReport) => weatherReport.municipio.NOMBRE === action.payload.municipio.NOMBRE
        )
          ? [...state.weatherReports]
          : [...state.weatherReports, action.payload];
      })
      .addCase(fetchWeatherReports.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectWeatherReports = (state) => state.selectedCitiesWeather.weatherReports;
export default searchBarSlice.reducer;
