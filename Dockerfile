FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . /var/www/html

# Enable useful Apache modules (optional but common)
RUN a2enmod rewrite headers

# Expose HTTP
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]


