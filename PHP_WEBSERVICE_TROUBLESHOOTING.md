# PHP Webservice Troubleshooting Guide

## Current Configuration for Email Sending

You're using Render's **webservice** option specifically for email functionality. Here's what we've set up:

### Files for PHP Webservice:
- ✅ `render.yaml` - PHP webservice configuration
- ✅ `index.php` - Main entry point with routing
- ✅ `send_email_simple_render.php` - Email handler
- ✅ `composer.json` - PHP dependencies
- ✅ `index.html` - Updated to use PHP form submission

### How Email Sending Works:
1. **User submits form** → JavaScript sends POST to `send_email_simple_render.php`
2. **PHP processes form** → Validates data and sends email via Gmail SMTP
3. **Email sent** → Both to you and CC to backup email
4. **User gets confirmation** → Success message displayed

## If Build Still Fails - Try These Solutions:

### Solution 1: Minimal PHP Configuration
If the current build fails, try this minimal `render.yaml`:

```yaml
services:
  - type: web
    name: dr-gonzaga-website
    env: php
    buildCommand: ""
    startCommand: php -S 0.0.0.0:$PORT
```

### Solution 2: Check Render Logs
1. Go to your Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for specific error messages
5. Share the error with me for debugging

### Solution 3: Alternative PHP Hosting
If Render continues to fail, try these alternatives:

#### Heroku (PHP Support):
1. Create new Heroku app
2. Add PHP buildpack
3. Deploy your code
4. Set environment variables for email

#### DigitalOcean App Platform:
1. Create new app
2. Select PHP runtime
3. Deploy your code
4. Configure email settings

#### Vercel (with PHP Functions):
1. Deploy to Vercel
2. Use Vercel Functions for PHP
3. Configure email sending

## Testing Your Email Setup:

### 1. Test PHP is Working:
Visit: `https://your-app.onrender.com/test_endpoint.php`
Should return: `{"success":true,"message":"PHP is working on Render!"}`

### 2. Test Email Sending:
1. Fill out the appointment form
2. Submit it
3. Check your email (bakulumpagigonzaga@gmail.com)
4. Check backup email (prossienabbona20@gmail.com)

### 3. Check Logs:
- Look at `email_log.txt` for email attempts
- Check Render logs for any errors

## Current Email Configuration:

**SMTP Settings:**
- Host: smtp.gmail.com
- Port: 587
- Username: prossienabbona20@gmail.com
- Password: mruernddvsdbtxhu (App Password)

**Recipients:**
- Primary: bakulumpagigonzaga@gmail.com
- CC: prossienabbona20@gmail.com

## If Email Still Doesn't Work:

### Check Gmail Settings:
1. Enable 2-Factor Authentication
2. Generate App Password
3. Update password in `send_email_simple_render.php`

### Alternative Email Services:
1. **SendGrid** - More reliable for production
2. **Mailgun** - Good for transactional emails
3. **Amazon SES** - Enterprise-grade email

## Next Steps:

1. **Try deploying** with current configuration
2. **If it fails** - share the specific error message
3. **If it works** - test the email functionality
4. **If emails don't work** - we'll debug the SMTP settings

The goal is to get PHP working on Render so your emails are sent automatically when someone books an appointment!

