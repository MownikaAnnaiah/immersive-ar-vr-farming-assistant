import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

model = tf.keras.models.load_model("models/crop_disease_model.h5")

img_path = "corn.jpg"   # change this to test another image

img = image.load_img(img_path, target_size=(224,224))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0

prediction = model.predict(img_array)

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

predicted_class = np.argmax(prediction)

print("Disease:", class_names[predicted_class])
print("Confidence:", np.max(prediction))