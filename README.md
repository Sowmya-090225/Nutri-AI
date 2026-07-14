# 🥗 Nutri AI

An intelligent, full-stack nutrition companion that personalizes your diet, tracks your wellness, and helps you build healthier habits.

---

## 🚀 Key Features

- **BMR & TDEE Calculation** — Personalized calorie targets using the Mifflin-St Jeor equation with goal-based adjustments
- **Personalized Meal Plans** — Breakfast, lunch & dinner recommendations based on dietary preference (Vegetarian, Non-Vegetarian, Vegan)
- **AI Chatbot Assistant** — Natural language calorie queries, BMI analysis, sleep & hydration checks with voice input support
- **Daily Calorie Tracker** — Log foods by name with auto-lookup; tracks intake vs. target
- **Water Intake Tracker** — One-tap logging with daily hydration goals
- **Sleep & Mood Tracker** — Log sleep hours and mood states with personalized wellness tips
- **Streak System** — Consecutive-day login tracking
- **BMI Calculator** — Standalone page with health category classification
- **Multi-Language Support** — Fully translated UI in 6 languages (English, Hindi, Telugu, Tamil, French, Urdu)
- **Theme Customization** — 6 accent color presets, 9 background presets, custom color picker, auto dark mode
- **Interactive Background** — Floating food emoji parallax and click-to-burst particle effects
- **Authentication** — Email/password with bcrypt hashing, Google OAuth 2.0, JWT sessions
- **Nutrition Data Upload** — Upload custom datasets via XLSX or CSV with smart column detection
- **Smart Reminders** — Automated meal-time and hydration reminders

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express 5 |
| **Database** | SQLite 3 via Sequelize ORM |
| **Auth** | JWT, bcryptjs, Google Auth Library |
| **File Parsing** | xlsx, csv-parser, multer |
| **External API** | [Open Food Facts](https://world.openfoodfacts.org/) |
| **Styling** | Vanilla CSS with CSS Custom Properties |
