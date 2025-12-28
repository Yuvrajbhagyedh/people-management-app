# People Management Application

A Single Page Application (SPA) built with Angular 7/8 to manage a list of people.

## Features

- **List all people**: View all people in a table format
- **Edit a person**: Create new or edit existing person records
- **Delete a person**: Remove people from the list with confirmation

## Prerequisites

- Node.js (v10 or higher)
- npm (v6 or higher)

## Installation

1. Install dependencies:
```bash
npm install
```

## API Setup (JSON Server)

This application uses **JSON Server** for a complete REST API backend with full CRUD support.

### Quick Start

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Start JSON Server** (in a separate terminal):
```bash
npm run server
```
The API will be available at `http://localhost:3000`

3. **Start Angular Development Server**:
```bash
npm start
```
The app will be available at `http://localhost:4200`

### Why JSON Server?

The public API at `api.restful-api.dev` has limitations:
- ❌ PUT requests return **405 Method Not Allowed**
- ❌ DELETE requests return **405 Method Not Allowed**
- ⚠️ POST may work but data isn't persisted

JSON Server provides:
- ✅ Full CRUD support (GET, POST, PUT, DELETE)
- ✅ Data persistence in `db.json`
- ✅ Proper HTTP status codes
- ✅ No external API dependencies

## REST API Endpoints

The application uses the following endpoints (via JSON Server):

- `GET http://localhost:3000/people` - Get all people
- `GET http://localhost:3000/people/:id` - Get a single person by ID
- `POST http://localhost:3000/people` - Create a new person
- `PUT http://localhost:3000/people/:id` - Update an existing person
- `DELETE http://localhost:3000/people/:id` - Delete a person

### Expected Person Model

```typescript
{
  id?: number;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  address?: string;
}
```

## Development Server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── people-list/      # Component for listing all people
│   │   └── person-edit/      # Component for creating/editing a person
│   ├── models/
│   │   └── person.model.ts   # Person interface/model
│   ├── services/
│   │   └── people.service.ts # Service for API calls
│   ├── app.component.*       # Root component
│   └── app.module.ts         # Root module
├── environments/             # Environment configuration
└── styles.css               # Global styles
```

## Usage

### Running the Application

**Terminal 1 - Start JSON Server:**
```bash
npm run server
```

**Terminal 2 - Start Angular App:**
```bash
npm start
```

### Using the Application

1. Open `http://localhost:4200` in your browser
2. View the list of people from the database
3. **Add Person**: Click "Add New Person" button, fill the form, submit
4. **Edit Person**: Click "Edit" on any person, modify details, save
5. **Delete Person**: Click "Delete" on any person, confirm deletion

All changes are persisted in `db.json` file.

### Troubleshooting

**404 Errors:**
- Ensure JSON Server is running on port 3000
- Check that `db.json` exists in the project root
- Verify the API URL in `src/environments/environment.ts`

**405 Errors:**
- These occur with public APIs that don't support PUT/DELETE
- Solution: Use local JSON Server (already configured)

**CORS Errors:**
- JSON Server handles CORS automatically
- If issues persist, check both servers are running

For detailed API documentation, see `API_SETUP.md`

