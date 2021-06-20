# About
the **public** folder the website with the game
highscore are stored in the **scores.json** file
the **server.ts** file is listening on http://localhost:8080
in my experience chrome seems to work best

# Requirements
deno https://deno.land/#installation
## Optionally
electron, electron-builder via npm i -D

# Run Server Locally
deno run --allow-net --allow-read --allow-write server.ts
access the index.html via the browser on http://localhost:8080
alternativly you can run the electron app in addition to the server (see below)

# Run Locally with Electron
- to run electron locally:
cd public/
npm run start 

- or access the build in public/dist
- or create your own build with:
cd public/
npm run dist

# Game Controls
use **A** and **D** to move the character left and right
use **W** to jump, can also be used simultaneously with A and D
jump on top of the rocks with faces and get from one rock to the next
the goal of the game is to get as far as possible
