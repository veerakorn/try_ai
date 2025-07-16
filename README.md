# React + Vite + Tailwind CSS

This project is a modern React application built with Vite and styled with Tailwind CSS. It features a beautiful, responsive design with gradient backgrounds, smooth animations, and modern UI components.

## 🚀 Features

- **React 18**: Latest React with functional components and hooks
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Hot Module Replacement**: Instant updates during development
- **Modern UI**: Beautiful gradient design with glassmorphism effects
- **Responsive Design**: Works perfectly on all device sizes

## 🛠️ Technologies Used

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [PostCSS](https://postcss.org/) - CSS Processing
- [Autoprefixer](https://autoprefixer.github.io/) - CSS Vendor Prefixes

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Tailwind CSS Configuration

The project includes a custom Tailwind configuration with:
- Custom animations (slow spin for React logo)
- Extended theme configuration
- PostCSS integration
- Autoprefixer for browser compatibility

## 📁 Project Structure

```
src/
├── App.jsx          # Main application component
├── index.css        # Tailwind CSS directives
├── main.jsx         # Application entry point
└── assets/          # Static assets (images, icons)

Configuration Files:
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

## 🌟 Key Features Implemented

- **Glassmorphism Design**: Modern glass-like UI with backdrop blur
- **Gradient Backgrounds**: Beautiful color gradients throughout
- **Interactive Animations**: Hover effects and smooth transitions
- **Counter Component**: Interactive button with state management
- **Logo Animations**: Rotating React logo with custom timing
- **Responsive Layout**: Mobile-first responsive design

## 🔧 Customization

### Adding New Tailwind Classes
Edit `tailwind.config.js` to add custom utilities, colors, or animations.

### Modifying Styles
The main styles are in `src/index.css` with Tailwind directives. Component-specific styles use Tailwind utility classes directly in JSX.

## 📝 Development Notes

- This project uses the latest React patterns with functional components and hooks
- Tailwind CSS is configured for optimal file size with purging enabled
- Hot Module Replacement ensures fast development iteration
- The build process is optimized for production deployment

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

---

Created with ❤️ using React + Vite + Tailwind CSS
