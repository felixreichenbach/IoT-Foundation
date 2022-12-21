import Realm from "realm";
import express from 'express';
import DotEnv from 'dotenv';
DotEnv.config()
// Define your data model.
export const RegistrationSchema = {
    name: 'Registration',
    properties: {
        _id: 'string?',
    },
    primaryKey: '_id',
};

console.log(`Connection to ${process.env.REALM_APP_ID} App`)
// Initialize your App.
const realm_app = new Realm.App({
    id: process.env.REALM_APP_ID,
});

// Authenticate an anonymous user.
await realm_app.logIn(Realm.Credentials.anonymous());

// Create a `SyncConfiguration` object.
const config = {
    schema: [RegistrationSchema],
    sync: {
        // Use the previously-authenticated anonymous user.
        user: realm_app.currentUser,
        // Set flexible sync to true to enable sync.
        flexible: true,
        // Define initial subscriptions to start syncing data as soon as the
        // realm is opened.
        initialSubscriptions: {
            update: (subs, realm) => {
                subs.add(
                    // Get objects that match your object model, then filter them
                    // the `owner_id` queryable field
                    //realm.objects("Task").filtered(`owner_id = ${app.currentUser.id}`)
                    realm.objects("Registration")
                );
            },
        },
    },
};
const realm = await Realm.open(config);

const express_app = express()
const port = 3000

express_app.get('/exists/:id', (req, res) => {
    res.send(exists(req.params.id));
})

express_app.get('/register/:id', (req, res) => {
    res.send(register(req.params.id));
})

express_app.get('/unregister/:id', (req, res) => {
    res.send(unregister(req.params.id));
})

function exists(id) {
    // search for a realm object with a primary key that is a string
    const result = realm.objectForPrimaryKey("Registration", id);
    console.log("Requested: " + id);
    console.log("Found: " + JSON.stringify(result));
    if (result) {
        return "TRUE";
    } else {
        return "FALSE";
    }
}

function register(id) {
    let result;
    realm.write(() => {
        // Create the registration
        result = realm.create("Registration", { _id: id }, Realm.UpdateMode.All);
    });
    // return newly created registration object
    return result;
}

function unregister(id) {
    let result;
    realm.write(() => {
        // Delete the registration.
        result = realm.delete(realm.objectForPrimaryKey("Registration", id));
    });
    return result;
}

express_app.listen(port, () => {
    console.log(`IoT app listening on port ${port}`)
})