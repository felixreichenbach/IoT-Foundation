
# IoT Reference 

This project demonstract simple way to setup Mongodb Realm as an embedded database for a NodeJS application and consume Data via RESTFul API's. This projects can be built as a Docker Image and deployed on any docker supported IoT Environment.

# Installation Setup
The project requires few prerequsites to be setup and configured. 

1. Mongodb Cluster need to set up and configured for the App services to connect it as a data source. Follow this [link](./MONGODB_CLUSTER.md) to setup a new Mongodb Cluster.

2. Project API key needed to be created. The API key will be used to login the `realm-cli`. Follow this [link](./API_KEY.md) to create a new API Key.

3. App Services needed to be created and configured on the for the Nodejs application to communicate . Follow this [link](./atlas-backend/README.md) to create and deploy a App Services.



# Run NodeJS Express Server

Change into the `device-js` directory.
```
cd device-js/
```

Create a .env file on the `device-js` directory.

```
REALM_APP_ID=<REALM_APP_ID>
```

Install the dependencies and run the application.

```
npm install
node index.js
```

# Docker 

### Build a Docker Image

To Build the NodeJS application into a docker image.

```
cd device-js/
docker build . -t device-image
```

Run the Built docker image with the following command. Set the Env variable, replace with your realm app id.
```
docker run -it --rm -d -p 3000:3000 -e REALM_APP_ID=<REALM_APP_ID> --name device-service device-image
```

# API Documentation

## Register a new Device.

Call the following URL and register <YOUR ID>:
```
#Request
GET http://localhost:3000/register/TN10BJ8856

# Response
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 20
ETag: W/"14-nsaMe/nV7ubrA7Su7dVY/q/cYLk"
Date: Mon, 19 Dec 2022 13:47:35 GMT
Connection: close

{
  "_id": "TN10BJ8856"
}
```

Call the following URL and remove your existing device <YOUR ID>:

```
#Request
http://localhost:3000/unregister/TN10BJ8856

#Response
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Tue, 20 Dec 2022 07:31:33 GMT
Connection: close
Content-Length: 0
```

Call the following URL and test if registration exists <YOUR ID>:
```
### Existance of a Device - Success Case

#Request
http://localhost:3000/exists/TN10BJ8856

#Response
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 4
ETag: W/"4-/d8d98MMrHkI0QJGJW79JkznqjI"
Date: Tue, 20 Dec 2022 07:32:33 GMT
Connection: close

TRUE


### Existance of a Device - Failure Case

#Request
http://localhost:3000/exists/TN10BJ8858

#Response
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 5
ETag: W/"5-DtLXtc23die8Rsb6xQJuwntpTUI"
Date: Tue, 20 Dec 2022 07:33:24 GMT
Connection: close

FALSE
```
