from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

import tensorflow as tf
import numpy as np
import cv2

from PIL import Image


app = Flask(__name__)
CORS(app)


# ==========================================
# LOAD TRAINED MODEL
# ==========================================

model = tf.keras.models.load_model(
    "models/crop_disease_model.h5"
)

print("Model loaded successfully")
print("Model output shape:", model.output_shape)
print("Number of classes:", model.output_shape[-1])


# ==========================================
# LOAD HUMAN FACE DETECTOR
# ==========================================

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)

print("Human face detector loaded successfully")


# ==========================================
# CLASS NAMES
# ==========================================

class_names = [
    "Corn_Downy_Mildew",
    "Corn_Leaf_Blight",
    "Corn_Rust",

    "Groundnut_Aflatoxin",
    "Groundnut_Stem_Necrosis",
    "Groundnut_Tikka_Leaf_Spot",

    "Mango_Anthracnose",
    "Mango_Bacterial_Canker",
    "Mango_Powdery_Mildew",

    "Paddy_Blast_Disease",
    "Paddy_False_Smut",
    "Paddy_Leaf_Scald",

    "Sugarcane_Red_Rot",
    "Sugarcane_Smut",
    "Sugarcane_Wilt",

    "Wheat_Loose_Smut",
    "Wheat_Septoria_Leaf_Blotch",
    "Wheat_Stripe_Rust"
]


# ==========================================
# PREDICTION API
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    # Check whether image was uploaded
    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    file = request.files["image"]

    try:

        # ==========================================
        # STEP 1: OPEN THE IMAGE
        # ==========================================

        img = Image.open(file).convert("RGB")

        # Convert PIL image into NumPy array
        original_image_array = np.array(img)

        # ==========================================
        # STEP 2: DETECT HUMAN FACE
        # ==========================================

        # Convert RGB image to grayscale
        gray_image = cv2.cvtColor(
            original_image_array,
            cv2.COLOR_RGB2GRAY
        )

        # Detect faces
        faces = face_cascade.detectMultiScale(
            gray_image,
            scaleFactor=1.1,
            minNeighbors=10,
            minSize=(80, 80)
        )

        print("\n==============================")
        print("FACE DETECTION")
        print("==============================")
        print("Number of faces detected:", len(faces))

        # ==========================================
        # STEP 3: STOP IF HUMAN FACE IS DETECTED
        # ==========================================

        if len(faces) > 0:

            print("Human face detected")
            print("Prediction stopped")

            return jsonify({
                "disease": "Not a Crop Leaf",
                "confidence": 100,
                "message": "Please scan a plant leaf, not a human face."
            })

        # ==========================================
        # STEP 4: RESIZE IMAGE FOR MODEL
        # ==========================================

        img = img.resize((224, 224))

        # Convert resized image to NumPy array
        img_array = np.array(
            img,
            dtype=np.float32
        )

        # ==========================================
        # STEP 5: NORMALIZE IMAGE
        # ==========================================

        img_array = img_array / 255.0

        # Add batch dimension
        img_array = np.expand_dims(
            img_array,
            axis=0
        )

        # ==========================================
        # STEP 6: MODEL PREDICTION
        # ==========================================

        prediction = model.predict(
            img_array,
            verbose=0
        )[0]

        # ==========================================
        # STEP 7: GET TOP 5 PREDICTIONS
        # ==========================================

        top_indices = np.argsort(
            prediction
        )[::-1][:5]

        print("\n==============================")
        print("TOP 5 PREDICTIONS")
        print("==============================")

        top_predictions = []

        for index in top_indices:

            disease_name = class_names[int(index)]

            confidence = float(
                prediction[index]
            )

            confidence_percentage = round(
                confidence * 100,
                2
            )

            print(
                f"{disease_name}: "
                f"{confidence_percentage}%"
            )

            top_predictions.append({
                "disease": disease_name,
                "confidence": confidence_percentage
            })

        # ==========================================
        # STEP 8: FINAL PREDICTION
        # ==========================================

        predicted_index = int(
            top_indices[0]
        )

        disease = class_names[
            predicted_index
        ]

        confidence = float(
            prediction[predicted_index]
        )

        confidence_percentage = round(
            confidence * 100,
            2
        )

        print("==============================")
        print("FINAL PREDICTION:", disease)
        print(
            "CONFIDENCE:",
            confidence_percentage,
            "%"
        )
        print("==============================")


        # ==========================================
        # STEP 9: SEND RESULT TO WEBPAGE
        # ==========================================

        return jsonify({
            "disease": disease,
            "confidence": confidence_percentage,
            "top_predictions": top_predictions
        })


    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500


# ==========================================
# RUN FLASK SERVER
# ==========================================
@app.route("/")
def home():
    return render_template("farmindex.html")


if __name__ == "__main__":
    import os

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )