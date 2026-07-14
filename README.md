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

## 🏗️ Architecture

```
NUTRI AI/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # 13 React components
│   │   │   ├── Auth.jsx            # Login / Register / Google OAuth
│   │   │   ├── Dashboard.jsx       # Main dashboard hub
│   │   │   ├── Chatbot.jsx         # AI nutrition assistant
│   │   │   ├── FoodTracker.jsx     # Daily food logging
│   │   │   ├── WaterTracker.jsx    # Hydration tracking
│   │   │   ├── SleepTracker.jsx    # Sleep monitoring
│   │   │   ├── MoodTracker.jsx     # Mood & wellness
│   │   │   ├── BMICalculator.jsx   # BMI analysis page
│   │   │   ├── NutritionUpload.jsx # CSV/XLSX upload
│   │   │   ├── ProfileSetup.jsx    # Profile & avatar
│   │   │   ├── ThemeSettings.jsx   # Color customization
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   └── InteractiveBackground.jsx  # Particle effects
│   │   ├── context/
│   │   │   └── LanguageContext.jsx  # i18n provider
│   │   ├── translations.js         # 6-language translation pack
│   │   ├── api.js                   # Axios instance
│   │   ├── App.jsx                  # Router & layout
│   │   └── index.css                # Design system
│   └── package.json
│
├── server/                    # Express.js Backend
│   ├── models/                # 9 Sequelize models
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── FoodNutrition.js
│   │   ├── FoodLog.js
│   │   ├── WaterIntake.js
│   │   ├── SleepLog.js
│   │   ├── MoodLog.js
│   │   ├── Streak.js
│   │   └── ThemePreference.js
│   ├── routes/                # 10 API route modules
│   │   ├── auth.js            # Authentication endpoints
│   │   ├── profile.js         # Profile CRUD
│   │   ├── diet.js            # Diet plan & BMI
│   │   ├── nutrition.js       # Calorie lookup & upload
│   │   ├── foodlog.js         # Food logging
│   │   ├── water.js           # Water intake
│   │   ├── sleep.js           # Sleep tracking
│   │   ├── mood.js            # Mood tracking
│   │   ├── streak.js          # Streak management
│   │   └── theme.js           # Theme persistence
│   ├── logic/
│   │   └── dietEngine.js      # BMR/TDEE & meal plan generator
│   ├── db.js                  # SQLite + Sequelize setup
│   ├── config.js              # Environment config
│   └── index.js               # Express server entry point
│
└── README.md
```

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

## 🛠️ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A Google OAuth Client ID *(optional, for Google Sign-In)*

### 1. Clone the Repository

```bash
git clone https://github.com/Sowmya-090225/Nutri-AI.git
cd Nutri-AI
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
PORT=5000
```

Start the server:

```bash
npm run dev     # Development (with nodemon)
# or
npm start       # Production
```

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the client:

```bash
npm run dev
```

### 4. Open in Browser

Navigate to **http://localhost:5173** — and start your wellness journey! 🎉

---

## 🔌 API Reference

All endpoints are prefixed with `/api`.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login with email & password |
| `POST` | `/auth/google` | Google OAuth login |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/profile` | Get user profile |
| `PUT` | `/profile` | Update profile (age, weight, height, goal, dietary preference, allergies, avatar) |
| `DELETE` | `/profile` | Delete user account |

### Diet & Nutrition
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/diet/plan` | Get personalized meal plan |
| `GET` | `/diet/bmi` | Calculate BMI |
| `GET` | `/nutrition/search?query=` | Search nutrition database |
| `GET` | `/nutrition/calories?query=` | Smart calorie lookup (DB → built-in → Open Food Facts) |
| `POST` | `/nutrition/upload` | Upload XLSX/CSV nutrition data |

### Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/water` | Get today's water intake |
| `POST` | `/water` | Log water intake |
| `GET` | `/foodlog` | Get today's food logs |
| `POST` | `/foodlog` | Add food log entry |
| `GET` | `/sleep` | Get today's sleep data |
| `POST` | `/sleep` | Log sleep hours |
| `GET` | `/mood` | Get today's & previous mood |
| `POST` | `/mood` | Save today's mood |
| `POST` | `/streak/update` | Update daily login streak |

### Theme
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/theme` | Get saved theme preferences |
| `POST` | `/theme` | Save theme (accent color) |

---

## 🍽️ Calorie Lookup Pipeline

Nutri AI uses a **3-tier fallback system** for calorie queries:

```
┌─────────────────────────┐
│  1. Your Uploaded Data   │  ← XLSX/CSV datasets you've uploaded
│     (FoodNutrition DB)   │
└────────────┬────────────┘
             │ Not found?
┌────────────▼────────────┐
│  2. Built-in Dictionary  │  ← 100+ pre-loaded foods with
│     (FOOD_DICT)          │     serving sizes & calorie tags
└────────────┬────────────┘
             │ Not found?
┌────────────▼────────────┐
│  3. Open Food Facts API  │  ← World's largest open food
│     (External Fallback)  │     database (no API key needed)
└─────────────────────────┘
```

---

## 🧮 Diet Engine Logic

The diet engine computes your daily calorie target using scientifically-backed formulas:

1. **BMR** (Basal Metabolic Rate) via the **Mifflin-St Jeor Equation**:
   - Male: `BMR = 88.362 + (13.397 × weight) + (4.799 × height) − (5.677 × age)`
   - Female: `BMR = 447.593 + (9.247 × weight) + (3.098 × height) − (4.330 × age)`

2. **TDEE** (Total Daily Energy Expenditure): `TDEE = BMR × 1.2` (sedentary multiplier)

3. **Goal Adjustment**:
   - Weight Loss: `TDEE − 500 kcal`
   - Maintenance: `TDEE` (no change)
   - Weight Gain: `TDEE + 500 kcal`

4. **Meal Distribution**: Breakfast (25%) · Lunch (35%) · Dinner (40%)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Ideas for Contribution
- 🌍 Add more language translations
- 📱 Progressive Web App (PWA) support
- 📊 Weekly/monthly analytics charts
- 🏋️ Exercise tracking integration
- 🔗 Integration with fitness wearables

---

## 📄 License

This project is licensed under the **ISC License** — see the [package.json](server/package.json) for details.

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
