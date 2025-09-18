# Dr. Gonzaga Website - Render Deployment Guide

## 🚀 Deployment Steps

### 1. **Upload Files to Render**
Make sure to upload ALL these files to your Render deployment:

#### **Essential Files:**
- `index.html` - Main website
- `styles.css` - Styling
- `script.js` - JavaScript functionality
- `send_email_render.php` - Email handler for Render
- `PHPMailer/` - Entire PHPMailer folder with all subfolders

#### **Images & Media:**
- `images/` - All image files
- `videos/` - All video files
- `before After images/` - Before/after surgery images

### 2. **Render Configuration**

#### **Build Command:**
```bash
# No build command needed for static site
```

#### **Start Command:**
```bash
php -S 0.0.0.0:$PORT
```

#### **Environment Variables:**
Set these in Render dashboard:
- `PHP_VERSION` = `8.1` (or latest)
- `SMTP_USERNAME` = `prossienabbona20@gmail.com`
- `SMTP_PASSWORD` = `mruernddvsdbtxhu`

### 3. **Update HTML Form Action**

In your deployed `index.html`, change:
```html
<!-- FROM: -->
<form id="appointmentForm" action="send_email_alternative.php" method="POST">

<!-- TO: -->
<form id="appointmentForm" action="send_email_render.php" method="POST">
```

And in the JavaScript:
```javascript
// FROM:
fetch('send_email_alternative.php', {

// TO:
fetch('send_email_render.php', {
```

### 4. **Email Configuration for Render**

The `send_email_render.php` file includes:
- ✅ PHPMailer fallback
- ✅ Basic mail() function fallback  
- ✅ File backup system
- ✅ Error logging
- ✅ Render-optimized settings

### 5. **Testing After Deployment**

1. **Test the contact form** on your Render URL
2. **Check email delivery** to both Gmail accounts
3. **Check backup file** if email fails (appointments_backup.txt)
4. **Check error logs** (email_log.txt)

### 6. **Troubleshooting**

#### **If emails don't work:**
1. Check `email_log.txt` for errors
2. Check `appointments_backup.txt` for saved appointments
3. Verify PHPMailer folder is uploaded completely
4. Check Render logs for PHP errors

#### **Common Issues:**
- **PHPMailer missing**: Upload the entire PHPMailer folder
- **SMTP blocked**: Render may block SMTP, use external service
- **File permissions**: Check if files can be written to

### 7. **Alternative Email Services**

If Gmail SMTP doesn't work on Render, consider:
- **SendGrid** (recommended)
- **Mailgun**
- **Amazon SES**

### 8. **File Structure on Render**
```
your-render-app/
├── index.html
├── styles.css
├── script.js
├── send_email_render.php
├── PHPMailer/
│   ├── src/
│   └── language/
├── images/
├── videos/
├── before After images/
├── email_log.txt
└── appointments_backup.txt
```

## ✅ Success Checklist

- [ ] All files uploaded to Render
- [ ] HTML form points to `send_email_render.php`
- [ ] PHPMailer folder uploaded completely
- [ ] Contact form works on live site
- [ ] Emails are delivered successfully
- [ ] Backup system works if email fails

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Check email_log.txt
3. Test locally first
4. Verify all files are uploaded
