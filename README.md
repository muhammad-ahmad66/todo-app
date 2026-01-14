# TodoApp - Premium Task Management

A production-ready, enterprise-grade Todo Application built with TypeScript, React, Tailwind CSS, Redux Toolkit, React Router, and LocalStorage. This is a premium SaaS-quality application with exceptional UI/UX and full mobile responsiveness.

## 🚀 Features

### Core Features
- **Complete Authentication System**: Login, Signup, and User Profile management with Redux + LocalStorage persistence
- **DummyJSON Integration**: User authentication and data sync with external API
- **Full CRUD Operations**: Create, Read, Update, and Delete todos with LocalStorage persistence
- **Advanced Todo Management**:
  - Title, description, due dates
  - 4-level priority system (Low, Medium, High, Urgent)
  - Categories with color coding
  - Status tracking (Pending, In Progress, Completed, Archived)
  - Subtasks support
  - Tags and attachments support
- **Powerful Filtering & Search**: Filter by status, priority, category, due date with real-time search
- **Smart Sorting**: Multiple sort options (date, priority, title, status)
- **Bulk Operations**: Select and manage multiple todos at once

### Premium Features
- ✅ **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- ✅ **Productivity Streaks**: Track daily completion streaks
- ✅ **Analytics Dashboard**: Beautiful charts with Recharts (Priority distribution, Status breakdown, Category analysis)
- ✅ **Export/Import**: JSON backup and restore functionality
- ✅ **Responsive Design**: Mobile-first design with collapsible sidebar
- ✅ **Keyboard Shortcuts**: Quick actions for power users
- ✅ **Premium Loading States**: Elegant loading animations
- ✅ **Error Boundaries**: Comprehensive error handling with fallback UI
- ✅ **Toast Notifications**: User-friendly feedback system

### UI/UX Highlights
- **Premium Design System**: Indigo-based color palette (#6366f1) with modern typography (Inter font)
- **Smooth Animations**: Framer Motion for delightful micro-interactions
- **Skeleton Loading**: Loading states for better perceived performance
- **Empty States**: Helpful empty state illustrations
- **Mobile Navigation**: Bottom navigation bar for mobile devices
- **Accessible**: WCAG AA compliant with keyboard navigation support

## 📦 Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Date-fns** - Date utilities

## 🏗️ Project Structure

```
src/
├── api/                    # API layer
│   ├── helpers/           # API configuration and interceptors
│   ├── user/              # User API endpoints
│   └── todo/              # Todo API endpoints
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   ├── todos/             # Todo management feature
│   ├── theme/             # Theme management
│   └── dashboard/         # Dashboard analytics
├── components/            # Reusable components
│   ├── ui/                # UI component library
│   └── layout/            # Layout components
├── layouts/               # Page layouts
├── pages/                 # Page components
├── routes/                # Routing configuration
├── store/                 # Redux store setup
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── hooks/                 # Custom React hooks
└── providers/             # Context providers
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 🔐 Authentication

The app uses DummyJSON for authentication simulation:
- **Login**: Use any username/password combination (min 6 characters)
- **Signup**: Create a new account with username, email, and password
- Authentication state is persisted in Redux with localStorage

**Note**: For offline mode or when DummyJSON is unavailable, the app falls back to mock authentication.

## 📱 Usage

### Creating a Todo
1. Navigate to the Todos page
2. Click "New Todo" button
3. Fill in the form (title is required)
4. Set priority, category, due date, and description
5. Click "Create Todo"

### Filtering Todos
- Use the search bar to find todos by title or description
- Filter by status, priority, category, or due date using dropdowns
- Clear filters with the "Clear" button

### Sorting Todos
- Select a sort option from the "Sort by" dropdown
- Sort by date, priority, title, or status in ascending/descending order

### Managing Todos
- Click on a todo to select it
- Toggle completion status by clicking the circle icon
- Edit or delete using hover actions
- Bulk select multiple todos for batch operations

### Dashboard & Analytics
- View productivity insights and streaks
- Check completion statistics
- Analyze todo distribution by priority, category, and status

### Settings
- Toggle between light and dark themes
- Export your data as JSON backup
- Import from a backup file
- Clear all data (use with caution!)

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:
```js
colors: {
  primary: {
    // Your custom primary colors
  },
}
```

### Adding Categories
Update the `CATEGORIES` array in `src/utils/constants.ts`:
```ts
export const CATEGORIES = [
  { name: 'Your Category', color: '#hexcode' },
  // ...
];
```

## 🔧 Development

### Adding New Features
1. Create feature module in `src/features/`
2. Add Redux slice if needed
3. Create UI components in `src/components/ui/`
4. Add routes in `src/routes/AppRouter.tsx`

### Code Style
- Follow TypeScript strict mode
- Use functional components with hooks
- Implement proper error handling
- Add JSDoc comments for complex functions

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for API simulation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for data visualization
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using modern web technologies