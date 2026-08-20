const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/contact.md"), "utf8");
    const lines = raw.split("\n").filter((line) => line.trim().startsWith("-"));

    return lines.map((line) => {
        const match = line.match(/-\s*(.+?):\s*(.+)/);
        const label = match[1].trim();
        const value = match[2].trim().replace(/^\[|\]$/g, "");
        const href = label.toLowerCase() === "email" ? `mailto:${value}` : value;
        return { label, value, href };
    });
};
