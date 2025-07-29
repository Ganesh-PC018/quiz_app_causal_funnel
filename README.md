## 📚 Quiz App

A fully functional, responsive Quiz Application built with **Vite + React**, **Node.js**, **MongoDB Atlas**, and **Bootstrap**. The app fetches questions from the [Open Trivia Database API](https://opentdb.com/api.php?amount=15) and supports email-based login, a 30-minute countdown timer, result reporting, attempt history, and much more.

---

### 🚀 Features

* 📩 **Start Page** for user email submission.
* ❓ Displays **15 quiz questions** from OpenTDB.
* ⏲️ **30-minute timer** that auto-submits when it reaches 0.
* 📊 **Dashboard** for:

  * Highest scores.
  * Attempt history.
* 🧭 **Navigation Panel**:

  * View which questions are visited.
  * See which are attempted.
* 🧾 **Result Report Page**:

  * Each question.
  * User’s answer vs. correct answer.
* ☁️ Data stored and fetched via **MongoDB Atlas**.
* 🧰 Tech Stack:

  * Frontend: `Vite + React`, `Bootstrap`, `Bootstrap Icons`
  * Backend: `Node.js + Express.js`
  * Database: `MongoDB Atlas`

---

### 📦 Installation Instructions

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. **Install frontend dependencies:**

   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd ../server
   npm install
   ```

4. **Setup Environment Variables:**
   Create a `.env` file in the server directory:

   ```env
   MONGODB_URI=your_mongodb_atlas_url
   PORT=5000
   ```

5. **Start the application:**

   * Backend:

     ```bash
     npm run dev
     ```
   * Frontend:

     ```bash
     cd ../client
     npm run dev
     ```

---

### 📁 Folder Structure

```
quiz-app/
├── client/        # React frontend (Vite)
│   └── ...
├── server/                 # Node.js backend
│   └── ...
├── README.md
└── ...
```

---

### 📝 Assumptions

* User only needs to submit their **email** to start the quiz.
* One quiz attempt = 15 questions; no pause/stop allowed.
* Results are saved only after quiz submission or timeout.

---

### 💡 Additional Features (Bonus)

* ✅ Responsive across all major screen sizes.
* 🎯 Tracks previous quiz attempts.
* 🏆 Dashboard shows highest score.
* 🔄 Smooth navigation transitions between questions.
* 📈 Tracks visited & attempted questions in overview panel.
* 💬 Clear UI using Bootstrap for icons and layout.

---

### 🧪 Challenges Faced

* **API Decoding**: OpenTDB API returns HTML-encoded text which needed decoding.
* **Timer Handling**: Implemented synchronized countdown and ensured auto-submit on zero.
* **State Management**: Controlled navigation, answer tracking, and visited states without third-party state management libraries.
* **Backend Sync**: Managed MongoDB integration with Express while maintaining quiz integrity.

---

### 📸 Screenshots

> You can add screenshots like:

* Start Page
* Quiz in-progress
* Timer on top
* Navigation Panel
* Result Report
* Dashboard with previous attempts

---

### 📬 Submission Info

* 🔗 Hosted On: https://quiz-app-frontend-ttzm.onrender.com
