FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . /var/www/html

# Install ffmpeg for video transcoding
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Transcode any MP4s to H.264/AAC for broad browser compatibility
# This runs at build time so the deployed assets are always web-safe
RUN bash -lc 'shopt -s nullglob; for f in /var/www/html/videos/*.mp4; do tmp="${f%.mp4}.tmp.mp4"; ffmpeg -y -hide_banner -loglevel error -i "$f" -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$tmp" && mv -f "$tmp" "$f"; done'

# Enable useful Apache modules (optional but common)
RUN a2enmod rewrite headers

# Expose HTTP
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]


