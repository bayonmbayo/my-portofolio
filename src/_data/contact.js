const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/contact.md"), "utf8");
    const body = raw.replace(/^#[^\n]*\n+/, "");
    const lines = body.split("\n");

    const intro = lines
        .filter((line) => line.trim() && !line.trim().startsWith("-"))
        .join(" ")
        .trim();

    const items = lines
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => {
            const match = line.match(/-\s*(.+?):\s*(.+)/);
            const label = match[1].trim();
            const value = match[2].trim().replace(/^\[|\]$/g, "");
            const href = label.toLowerCase() === "email" ? `mailto:${value}` : value;
            return { label, value, href };
        });

    return { intro, items };
};
