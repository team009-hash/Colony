// auth-postcss.config.cjs
const prefixSelector = require("postcss-prefix-selector");

module.exports = (ctx) => {
    // ctx.file may be an object or a string depending on the runner
    const file = ctx.file && (ctx.file.basename || ctx.file);
    const isAuth = file && /auth\.css$/.test(file);

    return {
        plugins: [
            require("@tailwindcss/postcss"),

            // Only enable namespacing for auth.css
            isAuth &&
            prefixSelector({
                prefix: ".auth-scope",

                transform(prefix, selector, prefixedSelector) {
                    // If it's already prefixed, don't touch it
                    if (selector.startsWith(prefix)) return selector;

                    // Map global selectors to the wrapper instead of the real html/body
                    if (
                        selector === ":root" ||
                        selector === "html" ||
                        selector === "body" ||
                        selector === "html, body"
                    ) {
                        return prefix;
                    }

                    // Default behavior: .auth-scope <selector>
                    return prefixedSelector;
                },
            }),
        ].filter(Boolean),
    };
};
