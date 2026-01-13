package com.yeardots.wallpaper;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Handler;
import android.service.wallpaper.WallpaperService;
import android.view.SurfaceHolder;
import java.util.Calendar;

public class YearDotsWallpaperService extends WallpaperService {

    @Override
    public Engine onCreateEngine() {
        return new YearDotsEngine();
    }

    private class YearDotsEngine extends Engine {

        private final Handler handler = new Handler();
        private final Runnable drawRunner = new Runnable() {
            @Override
            public void run() {
                draw();
            }
        };

        private Paint dotPaint;
        private Paint todayPaint;
        private int width, height;
        private boolean visible = true;

        YearDotsEngine() {
            dotPaint = new Paint();
            dotPaint.setColor(Color.parseColor("#FFFFFF"));
            dotPaint.setAlpha(102); // 40% opacity
            dotPaint.setAntiAlias(true);

            todayPaint = new Paint();
            todayPaint.setColor(Color.parseColor("#FF6B35"));
            todayPaint.setAlpha(204); // 80% opacity
            todayPaint.setAntiAlias(true);
        }

        @Override
        public void onSurfaceCreated(SurfaceHolder holder) {
            super.onSurfaceCreated(holder);
        }

        @Override
        public void onSurfaceChanged(SurfaceHolder holder, int format, int width, int height) {
            super.onSurfaceChanged(holder, format, width, height);
            this.width = width;
            this.height = height;
            draw();
        }

        @Override
        public void onVisibilityChanged(boolean visible) {
            this.visible = visible;
            if (visible) {
                handler.post(drawRunner);
            } else {
                handler.removeCallbacks(drawRunner);
            }
        }

        @Override
        public void onSurfaceDestroyed(SurfaceHolder holder) {
            super.onSurfaceDestroyed(holder);
            visible = false;
            handler.removeCallbacks(drawRunner);
        }

        private void draw() {
            SurfaceHolder holder = getSurfaceHolder();
            Canvas canvas = null;

            try {
                canvas = holder.lockCanvas();
                if (canvas != null) {
                    // Clear canvas with dark background
                    canvas.drawColor(Color.parseColor("#0A0B0D"));

                    // Calculate grid dimensions
                    int cols = 15;
                    int rows = 25;
                    float dotSize = Math.min(width / (cols * 2), height / (rows * 2));
                    float spacing = dotSize * 1.5f;

                    // Calculate total days and current day
                    Calendar cal = Calendar.getInstance();
                    int year = cal.get(Calendar.YEAR);
                    int currentDay = cal.get(Calendar.DAY_OF_YEAR);
                    boolean isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
                    int totalDays = isLeapYear ? 366 : 365;

                    // Calculate offset to center the grid
                    float gridWidth = (cols - 1) * spacing;
                    float gridHeight = (rows - 1) * spacing;
                    float offsetX = (width - gridWidth) / 2;
                    float offsetY = (height - gridHeight) / 2;

                    // Draw dots
                    int dotIndex = 0;
                    for (int row = 0; row < rows; row++) {
                        for (int col = 0; col < cols; col++) {
                            float x = offsetX + col * spacing;
                            float y = offsetY + row * spacing;

                            dotIndex++;
                            Paint paint = dotPaint;

                            if (dotIndex <= currentDay) {
                                if (dotIndex == currentDay) {
                                    paint = todayPaint;
                                } else {
                                    paint = new Paint(dotPaint);
                                    paint.setAlpha(204); // 80% opacity for filled dots
                                }
                            }

                            canvas.drawCircle(x, y, dotSize / 2, paint);
                        }
                    }
                }
            } finally {
                if (canvas != null) {
                    holder.unlockCanvasAndPost(canvas);
                }
            }

            // Schedule next update
            if (visible) {
                handler.postDelayed(drawRunner, 60000); // Update every minute
            }
        }
    }
}