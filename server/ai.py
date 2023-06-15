import numpy as np
from tensorflow import keras

# Data set size, ready to be plotted
data_size = 50000

# Generate pairs of random numbers as arrays, e.g. [[0.123, 0.456], ...] data size rows and 2 columns [2, 40]
X = np.random.uniform(0, 100, (data_size, 2))

# get their sums of each pair and stored as y
Y = np.sum(X, axis=1)

# 2 layers, 1 32-node hidden layer, 1 node output layer
model = keras.models.Sequential([
    keras.layers.Dense(32, activation='relu', input_shape=[2]),
    keras.layers.Dense(1)
])

# sets up model for training? uses adam optimizer, mean squared error loss, and mean absolute error metric
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# passthrough of data to train the model
model.fit(X, Y, epochs=10)

# Generate some test data
X_test = np.random.uniform(0, 100, (10, 2))
Y_test = np.sum(X_test, axis=1)

# making predictions
predictions = model.predict(X_test)

# Print the results
for i in range(10):
    print(f'{X_test[i, 0]} + {X_test[i, 1]} = {predictions[i, 0]} (true: {Y_test[i]})')


# Define the input
input_data = np.array([[7, 3]])

# Use the model to predict the sum
prediction = model.predict(input_data)

# Print the result
print(f'answer = {prediction[0, 0]}')
