# REST API

This is a very small, very simple "toy" REST API back-end that can be used for developing/testing a front-end app.

> To use the `req.rest` file for testing, install the Visual Studio Code extension **REST Client** by _Huachao Mao_.

<hr>

## Getting Started

Open a terminal window and navigate to the root of the project folder (where this README file is located).

1. Install the dependencies (node_modules)
   `yarn install` or `npm install`
   <br>
1. Initialze the database
   `yarn initdb` or `npm run initdb`
   <br>
1. Rename `EXAMPLE.env` to `.env` and modify the contents as appropriate.
   <br>
1. Start the server
   `yarn start` or `npm run start`

### Enable HTTPS

For testing secure connections from web browers running on the same computer that is running this web server (https://localhost), you can enable the https listener using a self-signed certificate. Other computers or emulated devices will not trust the certificate unless you copy it to the new device and install it.

> Note that on Windows, it's probably easiest to open a Git Bash terminal window to have access to `openssl`

1. Un-comment the https lines in `server.ts`
   <br>
1. Create self-signed certificate files in the project folder<br>
   `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
   <br>
1. Start the server
   `yarn start` or `npm run start`
