import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Check if UID is provided
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node scripts/set-admin.js <USER_UID>');
    process.exit(1);
}

const uid = args[0];
const serviceAccountPath = resolve('./serviceAccountKey.json');

try {
    // Read service account key
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

    // Initialize Firebase Admin
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    console.log(`Attempting to set admin claim for user: ${uid}...`);

    // Check if input is email or UID
    let targetUid = uid;
    if (uid.includes('@')) {
        console.log(`Input looks like an email. Looking up UID for ${uid}...`);
        try {
            const userRecord = await admin.auth().getUserByEmail(uid);
            targetUid = userRecord.uid;
            console.log(`Found UID: ${targetUid}`);
        } catch (e) {
            console.error(`Could not find user with email: ${uid}`);
            process.exit(1);
        }
    }

    // Set custom user claim
    await admin.auth().setCustomUserClaims(targetUid, { admin: true });

    console.log(`Successfully set admin claim for user ${targetUid} (${uid})`);
    console.log('NOTE: The user will need to refresh their token (sign out/in or force refresh) for changes to take effect.');

} catch (error) {
    if (error.code === 'ENOENT') {
        console.error('Error: serviceAccountKey.json not found in the project root.');
        console.error('Please download it from Firebase Console -> Project Settings -> Service accounts and place it in the root directory.');
    } else {
        console.error('Error setting admin claim:', error);
    }
    process.exit(1);
}
