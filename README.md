# Simple ID Check

Change into the device-js directory.

Run application with:
`node index.js`

Call the following URL and register <YOUR ID>:
`http://localhost:3000/register/<YOUR ID>`

Call the following URL and remove your registration:
`http://localhost:3000/unregister/<YOUR ID>`

Call the following URL and test if registration exists:
`http://localhost:3000/exists/<YOUR ID>`

Docker Image:

1. `docker build . -t device`
2. `docker run -it -p 3000:3000 --name device device`
