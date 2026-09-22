import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# Dataset Path
DATASET_DIR = "datasets"      # <-- Changed from "dataset"

# Image Size
IMG_SIZE = 224

# Batch Size
BATCH_SIZE = 32

# Epochs
EPOCHS = 10

# Data Generator
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True
)

# Training Data
train_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

# ✅ Print class order
print("CLASS INDICES =", train_generator.class_indices)
print("\nCLASS NAMES IN TRAINING ORDER:")
print(list(train_generator.class_indices.keys()))

# Validation Data
val_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Load MobileNetV2
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224,224,3)
)

# Freeze base layers
base_model.trainable = False

# Add Custom Layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)

# Output Layer
predictions = Dense(
    train_generator.num_classes,
    activation='softmax'
)(x)

# Final Model
model = Model(
    inputs=base_model.input,
    outputs=predictions
)

# Compile
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train Model
history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS
)

# ✅ Save model where your Flask app expects it
model.save("models/crop_disease_model.h5")

print("✅ Model Trained Successfully!")