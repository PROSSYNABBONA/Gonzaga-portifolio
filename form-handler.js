// Simple form handler for static hosting
// This handles form submission without PHP

function handleAppointmentForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const appointmentData = {
        timestamp: new Date().toISOString(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time'),
        notes: formData.get('notes') || ''
    };
    
    // Validate required fields
    if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || 
        !appointmentData.service || !appointmentData.date || !appointmentData.time) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(appointmentData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Store in localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointmentData);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Show success message
    showMessage('Thank you! Your appointment request has been received. We will contact you soon to confirm your appointment.', 'success');
    
    // Reset form
    form.reset();
    
    // Try to send email via external service (optional)
    sendEmailNotification(appointmentData);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'}`;
        messageDiv.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${message}`;
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

function sendEmailNotification(data) {
    // This is a placeholder for email sending
    // In a real implementation, you would use a service like:
    // - EmailJS
    // - Formspree
    // - Netlify Forms
    // - SendGrid
    
    console.log('Appointment data for email:', data);
    
    // For now, just log to console
    // You can implement actual email sending later
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', handleAppointmentForm);
    }
});

