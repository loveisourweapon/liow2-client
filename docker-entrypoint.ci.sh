#!/bin/sh
# Starts a virtual display so karma can drive Chromium, then runs the command.
# Alpine 3.6's xvfb package doesn't include the xvfb-run wrapper, so the server
# is started by hand. Harmless for the commands that don't need it (lint,
# typecheck) - Xvfb exits with the container.
set -e

Xvfb :99 -screen 0 1280x1024x24 -nolisten tcp &
export DISPLAY=:99

exec "$@"
