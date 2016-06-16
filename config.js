var config = {};

config.isProduction = true;

if (config.isProduction) {
    process.env.NODE_ENV === 'production';
}

module.exports = config