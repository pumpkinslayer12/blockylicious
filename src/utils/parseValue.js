export const parseValue = (value) => {
    if (value.indexOf("var:") === 0) {
        // Will give us preset--spacing--40 to use wordpress native variables
        // Wordpress variables us '--'
        const varValue = value.split(":")[1].split('|').join("--")

        // tie it all together to give wordpress css variable
        // --wp--preset--spacing--40
        return `var(--wp--${varValue})`;
    }
    // if it's a valid css value
    return value;
}