# 📚 MERN Book Review App

This is a complete book review website built with MongoDB, Express, React, and Node.js. It allows users to sign up, log in, add books, and review them.



## 🚀 How to Run This Project

Follow these steps to get the project running on your local machine.

### Step 1: Clone the Repository
First, get the code onto your computer.
```bash
git clone <your-repository-url>
cd <repository-folder>
```

### Step 2: Set up the Backend (the "Brain" 🧠)

1.  Navigate into the backend folder:
    ```bash
    cd backend
    ```
2.  Create a new file named `.env`. This file holds your secret keys. Copy and paste the following into it:
    ```env
    # Your database connection link from MongoDB Atlas
    MONGO_URI=your_mongodb_atlas_connection_string

    # A long, random secret password for security
    JWT_SECRET=THISISASUPERLONGRANDOMSECRETKEY

    # The port your server will run on
    PORT=5000
    ```
3.  Install the necessary packages and start the server:
    ```bash
    npm install
    npm run dev
    ```
    Your backend API should now be running at `http://localhost:5000`.

### Step 3: Set up the Frontend (the "Face" 🖥️)

1.  Open a **new terminal** and navigate into the frontend folder:
    ```bash
    cd frontend
    ```
2.  Create a new file named `.env.local`. This tells the website where to find its brain (the backend).
    ```env
    # The address of your running backend API
    VITE_API_URL=http://localhost:5000/api
    ```
3.  Install the necessary packages and start the website:
    ```bash
    npm install
    npm run dev
    ```
    Your website should now be running at `http://localhost:5173`.

---
## 🎨 A Note on Styling (The Tailwind CSS Issue)

You might notice that the component files (`.jsx`) don't use lots of `className`s like `text-2xl font-bold`. Here’s a simple explanation why:

Think of our React components as having special style instructions written in a language called **Tailwind**. For our project to understand this language, it needed a **"Tailwind dictionary"** installed.

We ran into some issues with the local computer environment that prevented this "dictionary" from being installed correctly. It was like a delivery service that couldn't find our address.

**Our Solution:**
Instead of trying to fix the delivery, we just wrote out all the style rules ourselves in plain, simple CSS inside the `frontend/src/index.css` file. It achieves the same beautiful look, just in a more direct, manual way!
<img width="1794" height="905" alt="image" src="https://github.com/user-attachments/assets/31c8b463-c857-4a5f-b7ba-238e49c79376" />
<img width="1776" height="910" alt="image" src="https://github.com/user-attachments/assets/5a58ab9c-8475-453f-9d9a-59ffc3496434" />
