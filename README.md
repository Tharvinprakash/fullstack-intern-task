# Fullstack Intern Task

A fullstack application with React frontend and Node.js backend for template management with user authentication and favorites functionality.


Name : Tharvin prakash  
Email : tharvinprakash23@gmail.com
Linkedin : [LinkedIn] https://www.linkedin.com/in/tharvin  
Github : [GitHub] https://github.com/Tharvinprakash
Ph.No : 9361859374

## 🛠 Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Bootstrap** - UI components
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **Knex.js** - SQL query builder
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# JWT_SECRET=your-secret-key
# PORT=5000

# Run database migrations
npx knex migrate:latest

# Run database seeds
npx knex seed:run

# Start the server
npm run dev
