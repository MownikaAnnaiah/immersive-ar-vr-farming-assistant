# CORRECTED Reference-Matched VR Paddy Farm

This package is a corrected version of the previous scene.

## Why this version is different

The previous version placed the player at ground level, so the browser view showed a lot of empty sky and only a few primitive buildings/crops. This version starts in an **elevated three-quarter overview**, matching the supplied reference composition.

The farm now deliberately contains:
- dense golden crop rows in the foreground
- green crop rows
- red barns on the left
- blue/white farmhouse in the center
- tall windmill behind the farmhouse
- water tower
- red house with blue roof on the right
- long machinery shed
- 6 colorful tractors
- trailers, hay bales and crates
- pond and vegetable garden
- perimeter fence and dirt paths

## Run

Use VS Code Live Server or:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

## Controls

- `O` = reference-style elevated overview
- `P` = first-person walking mode
- Mouse = look
- WASD = move in walk mode
- Enter VR = immersive WebXR

## Important

This is still a procedural 3D scene. It is NOT the reference image pasted into the scene.

The included `3d-model-prompt.txt` is the prompt for creating higher-quality GLB/GLTF assets that can later replace the procedural objects.
