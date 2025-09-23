# Render Webservice Deployment Guide

## Configuration for Render Webservice Option

Since you're using Render's **webservice** option, here's the proper configuration:

### Files Created/Updated:

1. **`index.php`** - Main entry point that handles routing
2. **`render.yaml`** - Updated for PHP webservice
3. **`composer.json`** - PHP dependencies
4. **`Procfile`** - Process definition
5. **Updated `index.html`** - Fixed form endpoints

### How It Works:

1. **Main Entry Point**: `index.php` handles all requests and routes them appropriately
2. **Form Submission**: Goes to `/send_email_simple_render.php` via POST
3. **Fallback**: If PHP fails, redirects to static confirmation page
4. **Admin Access**: Visit `/admin-appointments.html` to view appointments

### Deployment Steps:

1. **Push to Git Repository**:
   ```bash
   git add .
   git commit -m "Configure for Render webservice"
   git push origin main
   ```

2. **Deploy on Render**:
   - Connect your Git repository
   - Select "Web Service" as the service type
   - Render will automatically detect PHP and use the configuration

3. **Test the Deployment**:
   - Visit `https://your-app.onrender.com/` (main site)
   - Visit `https://your-app.onrender.com/test_endpoint.php` (PHP test)
   - Try the appointment form

### Key Features:

✅ **Proper PHP Routing** - All requests go through `index.php`
✅ **Form Handling** - POST requests to `/send_email_simple_render.php`
✅ **Fallback System** - Works even if email sending fails
✅ **Admin Panel** - View appointments at `/admin-appointments.html`
✅ **Data Export** - Export appointments as CSV

### Troubleshooting:

1. **If you still get 405 errors**:
   - Check Render logs in the dashboard
   - Verify the `index.php` file is being used
   - Test the `/test_endpoint.php` endpoint

2. **If emails don't work**:
   - The form will still work and store data locally
   - You can view appointments in the admin panel
   - Data is also stored in browser localStorage

3. **If routing doesn't work**:
   - Make sure `index.php` is in the root directory
   - Check that `render.yaml` has the correct configuration

### File Structure:
```
/
├── index.php (main entry point)
├── index.html (main website)
├── send_email_simple_render.php (form handler)
├── contact-form-handler.html (confirmation page)
├── admin-appointments.html (admin panel)
├── test_endpoint.php (PHP test)
├── render.yaml (Render configuration)
├── composer.json (PHP dependencies)
├── Procfile (process definition)
└── .htaccess (Apache rules)
```

### Testing Checklist:

- [ ] Main website loads: `https://your-app.onrender.com/`
- [ ] PHP test works: `https://your-app.onrender.com/test_endpoint.php`
- [ ] Form submission works without 405 error
- [ ] Confirmation page shows after form submission
- [ ] Admin panel accessible: `https://your-app.onrender.com/admin-appointments.html`
- [ ] Data export works from admin panel

This configuration should resolve the 405 error and provide a fully functional appointment booking system on Render's webservice platform.
