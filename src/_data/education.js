const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/education.md"), "utf8");
    const blocks = raw.split(/^##\s+/m).slice(1);

    return blocks.map((block) => {
        const lines = block.trim().split("\n").map((line) => line.trim()).filter(Boolean);
        const title = lines[0];
        const rest = lines.slice(1);

        const field = (name) => {
            const line = rest.find((l) => new RegExp(`^${name}:\\s*`, "i").test(l));
            return line ? line.replace(new RegExp(`^${name}:\\s*`, "i"), "").trim() : "";
        };

        const institution = field("Institution");
        const institutionLink = field("InstitutionLink");
        const period = field("Period");

        const description = rest
            .filter((l) => !/^(Institution|InstitutionLink|Period):/i.test(l))
            .join(" ")
            .trim();

        return { title, institution, institutionLink, period, description };
    });
};
