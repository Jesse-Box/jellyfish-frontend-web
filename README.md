# Jellyfish Frontend

A modern React frontend for generating transparent color palettes. Built with **Vite**, **React 18**, **Tailwind CSS v4**, and a custom design system with composable components.

## 🎨 Features

- **Visual Color Palette Generator** - Convert solid colors to transparent versions
- **Real-time Preview** - See color swatches against your chosen background
- **Responsive Design** - Sidebar layout on desktop, stacked on mobile
- **Professional UI Components** - Custom Button, Input, Alert components with variants
- **Hero Icons Integration** - Beautiful iconography throughout the app
- **Error Handling** - Comprehensive form validation and error states

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Backend service** running (see [Backend Setup](#backend-setup))

### Frontend Setup

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd jellyfish-frontend-web
npm install
```

2. **Start the development server:**

```bash
npm run dev
# or
npm start
```

3. **Open your browser:**
   Navigate to [http://localhost:8000](http://localhost:8000)

## 🔗 Backend Setup

This frontend connects to the Jellyfish Backend service for color processing.

**Backend Repository:** [https://github.com/Jesse-Box/jellyfish-backend](https://github.com/Jesse-Box/jellyfish-backend)

### Running the Backend

1. **Clone the backend repository:**

```bash
git clone https://github.com/Jesse-Box/jellyfish-backend.git
cd jellyfish-backend
```

2. **Set up Python environment:**

```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

3. **Start the backend server:**

```bash
python app.py
```

The backend will run on [http://127.0.0.1:5000](http://127.0.0.1:5000)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Project Structure

```
src/
├── Alert/                 # Alert component with variants
│   ├── index.jsx         # Main Alert component
│   └── variants.jsx      # CVA styling variants
├── Button/               # Button system with shared architecture
│   ├── index.jsx         # Main exports
│   ├── text.jsx          # ButtonText component
│   ├── icon.jsx          # ButtonIcon component
│   ├── variants.jsx      # CVA styling variants
│   └── props.jsx         # Shared prop definitions
├── ColorSwatch/          # Color display components
│   ├── index.jsx         # ColorSwatch container
│   └── colorSquare.jsx   # Individual color square
├── EmptyState/           # Empty state component
├── Form/                 # Form with validation logic
├── Input/                # Input component with variants
├── InputGroup/           # Input with error state and actions
├── Results/              # Color results display
└── Section/              # Section wrapper components
    ├── index.jsx         # Main Section component
    ├── header.jsx        # Section header with optional button
    └── body.jsx          # Section body with error handling
```

### Component Architecture

**Design System Features:**

- **CVA (Class Variance Authority)** for consistent component variants
- **Shared Props** between Button and IconButton components
- **Hero Icons** for professional iconography
- **Tailwind CSS v4** with custom theme configuration
- **Responsive Grid Layouts** for optimal space usage

## 🎯 Usage

1. **Enter Background Color** - Choose your base background color (hex format)
2. **Add Foreground Colors** - Add one or more foreground colors
3. **Generate Palette** - Click "Create Transparent Colors"
4. **View Results** - See original vs transparent color comparisons

## 🔧 Configuration

### Tailwind CSS v4

Theme configuration is handled through CSS custom properties in `src/index.css`:

```css
@import 'tailwindcss';

@theme {
	/* Custom colors, spacing, typography can be added here */
}
```

### API Endpoint

The frontend connects to the backend at:

```
http://127.0.0.1:5000/api/colors/
```

To change the API endpoint, update the fetch URL in `src/App.jsx`.

## 📦 Dependencies

### Core

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling framework

### UI Components

- **@heroicons/react** - Icon library
- **class-variance-authority** - Component variant management
- **clsx** - Conditional className utility

### Monitoring

- **@sentry/react** - Error tracking and monitoring

## 🎨 Design System

The app features a custom design system with:

- **Button Variants**: primary, secondary, destructive, outline, ghost, link
- **Input Components**: with validation states and error handling
- **Alert System**: success, error, warning, info variants
- **Responsive Layouts**: mobile-first design with desktop optimizations

## 📄 License

This project is licensed under the MIT License.

---

**110% vibe coded** 🎯
