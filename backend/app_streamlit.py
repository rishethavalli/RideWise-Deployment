import streamlit as st
import numpy as np

# Note: Model files are in Git LFS and cannot be deployed to Streamlit Cloud
# Using fallback heuristic predictions instead


# App title and description
st.title("🚴 RideWise: Bike Demand Prediction")
st.markdown("Predict hourly bike-sharing demand based on weather and time conditions")

# Sidebar for inputs
st.sidebar.header("Input Parameters")

# User inputs
hour = st.sidebar.slider("Hour of Day", 0, 23, 12)
temperature = st.sidebar.slider("Temperature (°C)", 0.0, 50.0, 25.0)
humidity = st.sidebar.slider("Humidity (%)", 0.0, 100.0, 50.0)
wind_speed = st.sidebar.slider("Wind Speed (km/h)", 0.0, 40.0, 10.0)

season = st.sidebar.selectbox("Season", ["spring", "summer", "fall", "winter"])
weather = st.sidebar.selectbox("Weather", ["clear", "cloudy", "rain", "storm"])
day_of_week = st.sidebar.selectbox("Day of Week", 
                                    ["Monday", "Tuesday", "Wednesday", "Thursday", 
                                     "Friday", "Saturday", "Sunday"])
is_holiday = st.sidebar.checkbox("Is Holiday?")
is_workingday = st.sidebar.checkbox("Is Working Day?", value=True)

# Map inputs
season_map = {"spring": 2, "summer": 3, "fall": 4, "winter": 1}
weather_map = {"clear": 1, "cloudy": 2, "rain": 3, "storm": 4}
day_map = {"Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, 
           "Friday": 5, "Saturday": 6, "Sunday": 0}

# Prepare feature dictionary
feature_dict = {
    'yr': 0,
    'mnth': 1,  # Default month
    'holiday': 1 if is_holiday else 0,
    'workingday': 1 if is_workingday else 0,
    'temp': temperature / 50.0,
    'atemp': temperature / 50.0,
    'hum': humidity / 100.0,
    'windspeed': wind_speed / 40.0,
    'day_of_week': day_map[day_of_week],
    'month': 1,
    'year': 2024,
    'cnt_lag_1': 4500,
    'cnt_lag_7': 4500,
    'cnt_lag_14': 4500,
    'cnt_roll_7': 4500,
    'temp_hum': (temperature / 50.0) * (humidity / 100.0),
    'temp_wind': (temperature / 50.0) * (wind_speed / 40.0),
    'season_2': 1 if season_map[season] == 2 else 0,
    'season_3': 1 if season_map[season] == 3 else 0,
    'season_4': 1 if season_map[season] == 4 else 0,
    'weathersit_2': 1 if weather_map[weather] == 2 else 0,
    'weathersit_3': 1 if weather_map[weather] >= 3 else 0,
    'weekday_1': 1 if day_map[day_of_week] == 1 else 0,
    'weekday_2': 1 if day_map[day_of_week] == 2 else 0,
    'weekday_3': 1 if day_map[day_of_week] == 3 else 0,
    'weekday_4': 1 if day_map[day_of_week] == 4 else 0,
    'weekday_5': 1 if day_map[day_of_week] == 5 else 0,
    'weekday_6': 1 if day_map[day_of_week] == 6 else 0,
}

# Prediction button
if st.button("🔮 Predict Bike Demand", type="primary"):
    # Use fallback prediction (models not available in Streamlit Cloud)
    base = 180
    season_mult = {"spring": 1.1, "summer": 1.3, "fall": 1.0, "winter": 0.7}
    weather_mult = {"clear": 1.2, "cloudy": 1.0, "rain": 0.7, "storm": 0.4}
    
    fallback = int(base * season_mult[season] * weather_mult[weather] * 
                  (temperature / 20.0) * (1.2 if is_workingday else 0.8) *
                  (0.9 if is_holiday else 1.0))
    
    # Display results
    st.success("### Prediction Result")
    st.metric(label="Predicted Hourly Bike Demand", 
             value=f"{fallback} bikes",
             delta="Heuristic prediction")
    
    # Additional insights
    col1, col2, col3 = st.columns(3)
    with col1:
        st.info(f"🌡️ Temperature: {temperature}°C")
    with col2:
        st.info(f"💧 Humidity: {humidity}%")
    with col3:
        st.info(f"🌬️ Wind: {wind_speed} km/h")

# Footer
st.markdown("---")
st.markdown("**RideWise** - Intelligent Bike Demand Prediction System")
