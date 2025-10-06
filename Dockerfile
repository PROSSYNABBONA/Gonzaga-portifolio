FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . /var/www/html

# Install ffmpeg for video transcoding
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Transcode any MP4s to H.264/AAC for broad browser compatibility (best-effort)
# Uses POSIX sh (no bash deps) and skips silently if folder/files are missing
RUN set -eu; \
    if [ -d /var/www/html/videos ]; then \
      for f in /var/www/html/videos/*.mp4; do \
        [ -e "$f" ] || continue; \
        tmp="${f%.mp4}.tmp.mp4"; \
        if ffmpeg -y -hide_banner -loglevel error -i "$f" -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$tmp"; then \
          mv -f "$tmp" "$f"; \
        else \
          echo "Skipping $f (transcode failed)"; rm -f "$tmp" || true; \
        fi; \
      done; \
    fi

# Enable useful Apache modules (optional but common)
RUN a2enmod rewrite headers

# Expose HTTP
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]


