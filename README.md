# Melvor Idle Stats

This as a Vue3 web app that converts a Melvor Idle save into a shareable image showing the stats of that character.

## Bulk convert svg to png

```
mogrify \
-path "./public/static/img/icons" \
-density 1200 \
-resize 50x50 \
-background none \
-format png \
"./public/static/img/icons/*.svg"
```
