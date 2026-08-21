const fs = require("fs");
const path = require("path");

module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, "../../content/experience.md"), "utf8");
    const blocks = raw.split(/^##\s+/m).slice(1);

    return blocks.map((block) => {
        const lines = block.trim().split("\n").map((line) => line.trim()).filter(Boolean);
        const title = lines[0];
        const rest = lines.slice(1);

        const field = (name) => {
            const line = rest.find((l) => new RegExp(`^${name}:\\s*`, "i").test(l));
            return line ? line.replace(new RegExp(`^${name}:\\s*`, "i"), "").trim() : "";
        };

        const company = field("Company");
        const companyLink = field("CompanyLink");
        const location = field("Location");
        const period = field("Period");

        const bullets = rest.filter((l) => l.startsWith("-")).map((l) => l.slice(1).trim());
        const description = rest
            .filter((l) => !/^(Company|CompanyLink|Location|Period):/i.test(l) && !l.startsWith("-"))
            .join(" ")
            .trim();

        return { title, company, companyLink, location, period, description, bullets };
    });
};
