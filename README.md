# OpenDreams

OpenDreams is an exclusive e-learning platform designed for high-achieving Cameroonian students. We provide access to top-tier educational resources and a supportive community to help students reach their full potential.

## 🚀 Features

- **Modern UI/UX**: Built with React Native and beautiful, responsive design
- **Complete Authentication Flow**: Onboarding, admission code, registration, login, password reset
- **Subtle Animations**: Professional, minimalistic animations throughout the app
- **TypeScript**: Full type safety for better development experience
- **Scalable Architecture**: Well-structured codebase following enterprise-level patterns
- **Cross-Platform**: Runs on iOS, Android, and Web
- **Future-Ready**: Prepared for Better Auth integration and backend services

## 🛠 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** for styling (Tailwind CSS for React Native)
- **Lucide React Native** for icons
- **Expo Router** for navigation (ready for implementation)

## 🎨 Design System

### Color Palette
- **Primary**: #F2BD24 (Golden yellow)
- **Neutral Tones**: 
  - White: #FFFFFF
  - Cream: #FCFAF7
  - Light Beige: #F5F0E8
  - Beige: #E8E0CF
  - Dark Beige: #9C874A
  - Brown: #8C8059

### Typography
- Font family: Inter (system fallback)
- Responsive font sizes from xs (12px) to 5xl (48px)

## 📱 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-moon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on specific platforms:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Customizable button component
│   ├── Input.tsx       # Animated input component with validation
│   └── index.ts
├── screens/            # Screen components
│   ├── OnboardingScreen.tsx     # Welcome/intro screen
│   ├── EnterCodeScreen.tsx      # Admission code entry
│   ├── CreateAccountScreen.tsx  # User registration
│   ├── LoginScreen.tsx          # User login
│   ├── ForgotPasswordScreen.tsx # Password reset request
│   ├── ResetPasswordScreen.tsx  # New password creation
│   ├── HomeScreen.tsx           # Main dashboard
│   └── index.ts
├── constants/          # App constants and theme
│   ├── colors.ts       # Color palette
│   └── theme.ts        # Theme configuration
├── types/              # TypeScript type definitions
│   └── index.ts
├── navigation/         # Navigation configuration (future)
├── utils/              # Utility functions (future)
└── hooks/              # Custom React hooks (future)
```

## 🎯 Authentication Flow

The app includes a complete authentication flow with smooth animations:

1. **Onboarding Screen** → Welcome message with "Get Started" or "Log In" options
2. **Enter Code Screen** → Admission code verification (6-character code)
3. **Create Account Screen** → User registration with form validation
4. **Login Screen** → User authentication with "Forgot Password" option
5. **Forgot Password Screen** → Email-based password reset request
6. **Reset Password Screen** → New password creation with strength indicator
7. **Home Screen** → Main application dashboard

## 🔮 Future Enhancements

- **Authentication**: Better Auth integration
- **Backend API**: RESTful API for course management
- **Course Management**: Video streaming, progress tracking
- **User Profiles**: Student dashboards and progress analytics
- **Payment Integration**: Course purchases and subscriptions
- **Offline Support**: Download courses for offline viewing
- **Push Notifications**: Course updates and reminders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Project Moon.

---

Built with ❤️ for Cameroonian students
