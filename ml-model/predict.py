import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Sample waste fill data
days = [1, 2, 3, 4, 5]
fill_levels = [20, 35, 50, 70, 90]

# Create DataFrame
data = pd.DataFrame({
    "Day": days,
    "FillLevel": fill_levels
})

# Training data
X = data[["Day"]]
y = data["FillLevel"]

# Create model
model = LinearRegression()

# Train model
model.fit(X, y)

# Predict next days
future_days = [[6], [7], [8]]

predictions = model.predict(future_days)

print("Future Predictions:")

for i, pred in enumerate(predictions):
    print(f"Day {i+6}: {pred:.2f}% full")

# Graph
plt.plot(days, fill_levels, marker='o', label="Actual Data")

future_x = [6, 7, 8]

plt.plot(future_x, predictions, marker='x', label="Predictions")

plt.xlabel("Days")
plt.ylabel("Bin Fill Level (%)")
plt.title("Smart Waste Prediction")

plt.legend()

plt.show()