import Realm from "realm";
import express from 'express';

export const DeviceSchema = {
    name: 'Device',
    properties: {
        _id: 'string?',
    },
    primaryKey: '_id',
};

// Initialize your App.
const realm_app = new Realm.App({
    id: "iot-foundation-auhka",
});

// Authenticate an anonymous user.
await realm_app.logIn(Realm.Credentials.anonymous());

// Create a `SyncConfiguration` object.
const config = {
    schema: [DeviceSchema],
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
                    realm.objects("Device")
                );
            },
        },
    },
};
const realm = await Realm.open(config);

const express_app = express()
const port = 3000

express_app.get('/:id', (req, res) => {
    res.send(exists(req.params.id));
})

express_app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function exists(id) {
    const result = realm.objectForPrimaryKey("Device", id); // search for a realm object with a primary key that is a string
    console.log("Requested: " + id);
    console.log("Found: " + JSON.stringify(result));
    if (result) {
        return "OK";
    } else {
        return "NOK";
    }
}