# Authentication Boilerplate

> An authentication boilerplate to base future web apps on

## Quick Start

```bash
# Install dependencies
npm install

# Create keys file
cd config/
touch keys

# Add content to keys:
module.exports = {
    mongoURI: "mongodb://<dbuser>:<dbpassword>@ds263639.mlab.com:63639/users",
    secretOrKey: "secret"
};

# Run Flow Aggregator
npm start

# Server runs on http://localhost:3031
```
