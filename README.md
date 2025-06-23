# 🎮 GukiChess

**GukiChess** is a real-time, full-stack multiplayer chess game built from scratch. It features an interactive drag-and-drop interface, rule enforcement via `chess.js`, and smooth live gameplay using `Socket.io`. Deployed on Render, it’s perfect for showcasing modern frontend-backend integration and responsive design.

---

## 🌐 Live Demo

Try the game live at:  
🔗 [https://gukichess.onrender.com](https://gukichess.onrender.com)

---

## 📘 Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Usage](#setup--usage)  
- [Architecture](#architecture)  
- [Future Enhancements](#future-enhancements)  
- [Screenshots](#screenshots)  
- [Contributing](#contributing)  
- [License](#license)

---

## ✅ Features

- 🧠 **Interactive Board**: User-friendly drag-and-drop interface with Unicode chess pieces.  
- ♟️ **Game Logic**: Powered by `chess.js` for move validation, check/checkmate, and FEN notation.  
- 🤝 **Multiplayer Support**: Real-time gameplay via `Socket.io`, with synced moves and updates.  
- 📱 **Responsive Design**: Tailwind CSS ensures a fluid experience on any device.  
- 🚀 **Live Deployment**: Seamless GitHub → Render pipeline with live demo link.

---

## 🧰 Tech Stack

| Layer         | Technology                     |
|--------------|-------------------------------|
| Front-End     | JavaScript · HTML · Tailwind CSS |
| Game Logic    | `chess.js`                   |
| Real-Time     | `Socket.io`                  |
| Server        | Node.js · Express.js         |
| Deployment    | Render                       |

---

🧩 Project Architecture
pgsql
Copy
Edit
GukiChess/
├── public/
│   ├── index.ejs
│   └── js/chessgame.js
├── server/
│   └── server.js
├── package.json
└── README.md
public/index.ejs: Renders the UI and imports Tailwind, client JS, and Socket.io.

public/js/chessgame.js: Manages game rendering, drag/drop logic, and socket events.

server/server.js: Handles HTTP/Socket.io connections and move broadcasting.

---

🎯 Future Enhancements
🤖 AI Opponent: Add Stockfish-powered single-player mode.

🔒 User Authentication: Secure player accounts and persistent game history.

🧩 Game Rooms & Chat: Introduce room creation, spectator mode, and chat.

🎮 Mobile Optimization: Further refine UI/UX for touchscreen gameplay.

📸 Screenshots

![Scholar's Mate](https://github.com/user-attachments/assets/e7aa8af6-5417-431c-b6b1-55eb74de0a5c)
![sample](https://github.com/user-attachments/assets/1e6c4d47-27ff-43e7-89be-f11d8530b6c0)

---

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.
