// app.js
import { Hono } from "https://deno.land/x/hono/mod.ts";
import { loginUser } from "./routes/login.js"; // Import login logic
import { registerUser } from "./routes/register.js"; // Import register logic
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

const app = new Hono();

// Middleware to set security headers globally
app.use('*', (c, next) => {

    c.header('Content-Type', 'text/html');
    // Set security headers
    c.header('Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self'; " +
        "img-src 'self'; " +
        "frame-ancestors 'none'; " +
        "form-action 'self';");

    c.header('X-Frame-Options', 'DENY');
    c.header('X-Content-Type-Options', 'nosniff');
    return next();
});

// Serve static files from the /static directory
app.use('/static/styles.css', serveStatic({ root: '.' }));

// Serve the index page
app.get('/', async (c) => {
    return c.html(await Deno.readTextFile('./views/index.html'));
});

// Serve the registration form
app.get('/register', async (c) => {
    return c.html(await Deno.readTextFile('./views/register.html'));
});

// Route for user registration (POST request)
app.post('/register', registerUser);

// Serve login page
app.get('/login', async (c) => {
    return c.html(await Deno.readTextFile('./views/login.html')); // Use the login.html file
});

// Handle user login
app.post('/login', loginUser);


Deno.serve(app.fetch);

// Run the app using the command:
// deno run --allow-net --allow-env --allow-read --watch app.js