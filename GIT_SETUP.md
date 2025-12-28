# Quick Fix: Git Not Recognized in VS Code

## Problem
Git works in regular PowerShell but not in VS Code terminal.

## Solution: Refresh VS Code Terminal

### Option 1: Restart VS Code (Recommended)
1. **Close VS Code completely**
2. **Reopen VS Code**
3. **Open your project folder again**
4. **Open terminal** (`Ctrl+Shift+` ` `)
5. Try `git --version` again

### Option 2: Refresh Terminal Session
1. **Close the terminal** in VS Code
2. **Open new terminal** (`Ctrl+Shift+` ` `)
3. Try `git --version`

### Option 3: Reload Window
1. Press `Ctrl+Shift+P`
2. Type: `Developer: Reload Window`
3. Press Enter
4. Try `git --version` again

---

## Verify Git Works

After refreshing, test in VS Code terminal:

```bash
git --version
```

Should show: `git version 2.52.0.windows.1`

---

## If Still Not Working

### Check PATH in VS Code Terminal

Run this to see if Git is in PATH:
```powershell
$env:PATH -split ';' | Select-String git
```

### Manually Add Git to PATH (if needed)

1. Find Git installation path (usually):
   ```
   C:\Program Files\Git\cmd
   ```

2. Add to PATH temporarily in terminal:
   ```powershell
   $env:PATH += ";C:\Program Files\Git\cmd"
   ```

3. Test:
   ```bash
   git --version
   ```

### Permanent Fix (if temporary works)

1. Search Windows: "Environment Variables"
2. Edit System Environment Variables
3. Click "Environment Variables"
4. Under "System variables", find "Path"
5. Click "Edit"
6. Add: `C:\Program Files\Git\cmd`
7. Click OK on all dialogs
8. Restart VS Code

---

## Once Git Works, Continue Setup

```bash
# Navigate to project (if not already there)
cd C:\Users\HP\Downloads\doctors

# Initialize Git
git init

# Configure (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add files
git add .

# Commit
git commit -m "Initial commit: Angular People Management App"
```

Then follow the GitHub hosting guide!

