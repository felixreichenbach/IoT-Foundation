# Simple ID Check

Change into the device-js directory.

Run application with:
`node index.js`

Call the following URL and add your ID:
`http://localhost:3000/<YOUR ID>`

Docker Image:

1. `docker build . -t device`
2. `docker run -p 3000:3000 device`