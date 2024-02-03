// File: eslintrc.js
// ------------------
// this file contains the configuration fo eslint

// Author: Heavendeep kaur
// Date: February 2, 2024

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest" : true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
    }
}
