const prefixSelector = require("postcss-prefix-selector");

module.exports = (ctx) => {
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
