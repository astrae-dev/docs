const path = require("path");

const port = process.env.PORT || "8000";

module.exports = {
  apps: [
    {
      name: "astrae-docs",
      cwd: __dirname,
      script: path.join(__dirname, ".venv/bin/mkdocs"),
      args: `serve --dev-addr 0.0.0.0:${port}`,
      interpreter: "none",
      autorestart: true,
      watch: false,
      env: {
        PORT: String(port),
      },
    },
  ],
};
