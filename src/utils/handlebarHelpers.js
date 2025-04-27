import Handlebars from 'handlebars';

Handlebars.registerHelper('capitalize', (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});