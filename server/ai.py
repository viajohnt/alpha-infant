import numpy as np
from tensorflow import keras
from tensorflow.keras.models import load_model

def train_and_save_model(X, Y, model_path):
    # Convert lists to numpy arrays
    X = np.array(X)
    Y = np.array(Y)

    # Create a simple Sequential model
    model = keras.models.Sequential([
        keras.layers.Dense(32, activation='relu', input_shape=[2]),
        keras.layers.Dense(1)
    ])

    # Compile and train the model
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    model.fit(X, Y, epochs=10)

    # Save the trained model
    model.save(model_path)

def make_prediction(input_data, model_path):
    # Load the trained model from file
    model = load_model(model_path)

    # Convert the input data to a numpy array
    input_data = np.array(input_data)

    # Use the model to make a prediction
    prediction = model.predict(input_data)

    # Return the prediction
    return prediction[0, 0]
