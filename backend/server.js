const express = require("express");

const cors = require("cors");

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());

app.use(express.json());

// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {

    res.json({

        message:
        "Smart Farming Backend Running 🚀"

    });

});

// ==============================
// AI STATUS ROUTE
// ==============================

app.get("/api/ai-status", (req, res) => {

    res.json({

        ai:
        "AI Detection Active",

        model:
        "TensorFlow.js",

        status:
        "Running"

    });

});

// ==============================
// SERVER
// ==============================
// ==============================
// AI DETECTION ROUTE
// ==============================

app.post("/api/detect", (req, res) => {

    res.json({

        disease:
        "Stripe Rust",

        confidence:
        "94%",

        treatment:
        "Apply Propiconazole fungicide"

    });

});

const PORT = 5000;

app.listen(PORT, () => {

    console.log(

        `Server running on port ${PORT}`

    );

});