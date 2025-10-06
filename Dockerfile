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
# Logs the codec before/after so you can verify in Render build logs
RUN set -eu; \
    if [ -d /var/www/html/videos ]; then \
      echo "Scanning /var/www/html/videos for mp4 files..."; \
      for f in /var/www/html/videos/*.mp4; do \
        [ -e "$f" ] || continue; \
        oldc=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nk=1:nw=1 "$f" || true); \
        echo "Video: $f codec=$oldc"; \
        if [ "$oldc" != "h264" ]; then \
          tmp="${f%.mp4}.tmp.mp4"; \
          if ffmpeg -y -hide_banner -loglevel error -i "$f" -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$tmp"; then \
            mv -f "$tmp" "$f"; \
            newc=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nk=1:nw=1 "$f" || true); \
            echo "Transcoded: $f codec_now=$newc"; \
          else \
            echo "Skipping $f (transcode failed)"; rm -f "$tmp" || true; \
          fi; \
        else \
          echo "Already h264: $f"; \
        fi; \
      done; \
    else \
      echo "/var/www/html/videos not found, skipping transcode step"; \
    fi

# Enable useful Apache modules (optional but common)
RUN a2enmod rewrite headers

# Expose HTTP
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]


