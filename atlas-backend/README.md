
# Mongodb App Services Setup.

## Step-1
Sign in to your MongoDB cloud if you have a account. or create one [here](https://account.mongodb.com/account/register). 

## Step-2
Once Login, Create a new App services project ```IoT-Foundation``` by clicking the App Services tab on the top bar.

![Project Creation](../screenshots/build-a-app.png?raw=true "Project Creation")

![Project Creation](../screenshots/realm-app-configuration.png?raw=true "Project Creation")

## Step-3
Install the Mognodb Realm CLI on your system.

```
npm install -g mongodb-realm-cli
```

## Step-4

Login your CLI using the API Public and Private key you created on the previous steps.

```
realm-cli login --api-key <my-api-key> --private-api-key <my-private-api-key>
```

# Deploy
Once Successfully installing the Realm CLI and login with your API Keys. Lets deploy the atlas backend using CLI.

```
cd atlas-backend
realm-cli push --remote <REALM_APP_ID>
```

Follow the steps on CLI to deploy the realm successfully.

![Project Creation](../screenshots/realm-successful-deployment.png?raw=true "Project Creation")

