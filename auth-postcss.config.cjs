const prefixSelector = require("postcss-prefix-selector");

module.exports = (ctx) => {

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
