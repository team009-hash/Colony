// postcss.config.cjs
const prefixSelector = require("postcss-prefix-selector");

module.exports = (ctx) => {
    // ctx.file may be an object or string depending on runner
    const file = ctx.file && (ctx.file.basename || ctx.file);
    const isDashboard = file && /dashboard\.css$/.test(file);

    return {
        plugins: [
            require("@tailwindcss/postcss"),
            // Only enable namespacing for dashboard.css
            isDashboard &&
            prefixSelector({
                prefix: ".colony-dashboard",
                transform(prefix, selector, prefixedSelector) {
                    if (selector.startsWith(prefix)) return selector;

                    if (
                        selector === ":root" ||
                        selector === "html" ||
                        selector === "body" ||
                        selector === "html, body"
                    ) {
                        return prefix;
                    }

                    return prefixedSelector;
                },
            }),
        ].filter(Boolean),
    };
};
