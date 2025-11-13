import { db } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const getUserProfile = async (req, res) => {
    const { email } = req.params;

    try {
        const usersCollection = db.collection('users');
        let user = await usersCollection.findOne({ email: email });

        if (!user) {
            user = {
                email: email,
                displayName: '',
                photoURL: '',
                bio: '',
                skills: [],
                location: '',
                createdAt: new Date().toISOString()
            };
            await usersCollection.insertOne(user);
        }

        return res.status(200).send({
            success: true,
            message: "User profile found",
            data: user
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const updateUserProfile = async (req, res) => {
    const { email } = req.params;
    const { displayName, photoURL, bio, skills, location } = req.body;

    try {
        const usersCollection = db.collection('users');
        
        const result = await usersCollection.updateOne(
            { email: email },
            {
                $set: {
                    displayName: displayName,
                    photoURL: photoURL,
                    bio: bio,
                    skills: skills,
                    location: location,
                    updatedAt: new Date().toISOString()
                }
            },
            { upsert: true }
        );

        return res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
