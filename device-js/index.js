import Realm from "realm";
import express from 'express';
import DotEnv from 'dotenv';
import { ObjectId } from 'bson';

DotEnv.config()
// Define your data model.
export const ModelSchema = {
    name: 'Model',
    properties: {
        _id: 'string?',
    },
    primaryKey: '_id',
};

export const TelemetrySchema = {
    name: 'Telemetry',
    properties: {
        _id: 'objectId?',
        event: "{}?",
    },
    primaryKey: '_id',
    asymmetric: true
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
    schema: [ModelSchema, TelemetrySchema], //, TelemetrySchema],
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
                    realm.objects("Model")
                );
            },
            rerunOnOpen: true,
        },
    },
};
const realm = await Realm.open(config);

const express_app = express();
const port = 3000;
express_app.use(express.json());

express_app.get('/model/create/:id', (req, res) => {
    res.send(create(req.params.id));
})

express_app.get('/model/get/:id', (req, res) => {
    res.send(get(req.params.id));
})

express_app.get('/model/remove/:id', (req, res) => {
    res.send(remove(req.params.id));
})

express_app.post('/event/', (req, res) => {
    res.send(send(req.body));
})

function get(id) {
    // search for a realm object with a primary key that is a string
    const result = realm.objectForPrimaryKey("Model", id);
    console.log("Requested: " + id);
    console.log("Found: " + JSON.stringify(result));
    if (result) {
        return result;
    } else {
        return "Not Found";
    }
}

function create(id) {
    let result;
    realm.write(() => {
        // Create the registration
        result = realm.create("Model", { _id: id }, Realm.UpdateMode.All);
    });
    // return newly created registration object
    return result;
}

function remove(id) {
    let result;
    realm.write(() => {
        // Delete the registration.
        result = realm.delete(realm.objectForPrimaryKey("Model", id));
    });
    return result;
}

function send(event) {
    let result;
    realm.write(() => {
        // write event to the Realm database
        result = realm.create("Telemetry", { _id: new ObjectId(), event: event });
        return result;
    });
    return result;
}

express_app.listen(port, () => {
    console.log(`IoT app listening on port ${port}`)
})