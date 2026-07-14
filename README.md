<p align="center">
  <img src="https://img.shields.io/badge/🥗_Nutri_AI-Your_Intelligent_Nutrition_Companion-2ecc71?style=for-the-badge&labelColor=1a1d2e" alt="Nutri AI Banner" />
</p>

<h1 align="center">🥗 Nutri AI</h1>

<p align="center">
  <strong>An intelligent, full-stack nutrition companion that personalizes your diet, tracks your wellness, and helps you build healthier habits — powered by smart algorithms and a beautiful interactive UI.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white&style=flat-square" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white&style=flat-square" alt="Node.js" />
  <img src="https://img.shields.io/badge/SQLite-Sequelize-003B57?logo=sqlite&logoColor=white&style=flat-square" alt="SQLite" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Languages-6-ff6b6b?style=flat-square" alt="Languages" />
</p>

---

## ✨ What is Nutri AI?

**Nutri AI** is more than just a calorie counter. It's a comprehensive wellness dashboard that combines **smart diet planning**, **real-time nutrition lookups**, **hydration tracking**, **sleep & mood monitoring**, and an **AI-powered chatbot** — all wrapped in a stunning, fully customizable interface with interactive particle effects.

Whether you're on a weight loss journey, maintaining a balanced diet, or bulking up, Nutri AI adapts to **your goals, your preferences, and your language**.

---

## 🚀 Key Features

### 🧠 Intelligent Diet Engine
- **BMR & TDEE Calculation** using the Mifflin-St Jeor equation with goal-based adjustments (weight loss / maintenance / weight gain)
- **Personalized Meal Plans** — breakfast, lunch & dinner recommendations based on your dietary preference (Vegetarian, Non-Vegetarian, or Vegan)
- **Dynamic Food Database** — starts with a built-in database of 100+ foods and grows as you upload your own nutrition datasets

### 🤖 AI Chatbot Assistant
- Natural language calorie queries — *"How many calories in 2 eggs?"*, *"Calories in chicken curry"*
- Instant BMI analysis & diet plan retrieval
- Sleep & hydration status checks via conversational interface
- 🎤 **Voice input** support via Web Speech API
- Quick-action buttons for common queries
- Multi-language chatbot responses

### 📊 Comprehensive Dashboard
| Tracker | What It Does |
|---------|-------------|
| 🔥 **Daily Calorie Tracker** | Log foods by name with auto-lookup; tracks intake vs. target |
| 💧 **Water Intake Tracker** | One-tap 250ml additions, custom amounts, daily goal (2500ml) |
| 😴 **Sleep Tracker** | Log hours with smart feedback (poor / good / great) |
| 😊 **Mood Tracker** | 5 mood states with personalized wellness tips |
| 🏅 **Streak System** | Consecutive-day login tracking with fire badge |
| 📈 **BMI Calculator** | Standalone page with health category classification |

### 🌐 Multi-Language Support
Fully translated UI in **6 languages**:
| Language | Code |
|----------|------|
| 🇬🇧 English | `en` |
| 🇮🇳 Hindi (हिन्दी) | `hi` |
| 🇮🇳 Telugu (తెలుగు) | `te` |
| 🇮🇳 Tamil (தமிழ்) | `ta` |
| 🇫🇷 French (Français) | `fr` |
| 🇵🇰 Urdu (اردو) | `ur` |

### 🎨 Deep Customization
- **6 accent color presets** + custom color picker
- **9 background presets** (including dark themes) + custom picker
- Auto dark mode detection based on background luminance
- Theme persistence across sessions (synced to backend)

### 🎆 Interactive Background
- Floating food emoji parallax layer that follows your cursor
- **Click-to-burst particle system** with confetti, shapes, and emoji poppers rendered on HTML5 Canvas
- Smooth gradient layer with mouse-tracking animation

### 🔐 Authentication
- Email/password registration & login with **bcrypt** hashing
- **Google OAuth 2.0** single sign-on
- JWT-based session management
- Profile avatar upload (custom photo or preset avatars)
- Account deletion support

### 📤 Nutrition Data Upload
- Upload custom nutrition datasets via **XLSX** or **CSV** files
- Smart column detection — auto-maps columns like `food_name`, `calories`, `protein`, `carbs`, `fats`, `serving_size`
- Upsert logic (update existing entries, create new ones)
- Uploaded data integrates seamlessly into the chatbot and food tracker

### 🔔 Smart Reminders
- Automated meal-time reminders at 8 AM (breakfast), 1 PM (lunch), and 8 PM (dinner)
- Hourly hydration check alerts

---


## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express 5 |
| **Database** | SQLite 3 via Sequelize ORM |
| **Auth** | JWT, bcryptjs, Google Auth Library |
| **File Parsing** | xlsx, csv-parser, multer |
| **External API** | [Open Food Facts](https://world.openfoodfacts.org/) (fallback calorie data) |
| **Styling** | Vanilla CSS with CSS Custom Properties (design tokens) |

---


## 👩‍💻 Author

**Sowmya**
- GitHub: [@Sowmya-090225](https://github.com/Sowmya-090225)

---

<p align="center">
  <strong>Built with ❤️ and 🥗 for a healthier world.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/⭐_Star_this_repo_if_you_find_it_useful!-FFD700?style=for-the-badge&labelColor=1a1d2e" alt="Star" />
</p>
