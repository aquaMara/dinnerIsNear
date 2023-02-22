import { getAuth } from 'firebase/auth';
import app from '../firebase-config';
import firebase from "firebase/compat";
import { useState } from 'react';

export const TagsSearch = (userId) => {

    const [tags, setTags] = useState();
    const auth = getAuth(app);

    firebase.firestore().collection('tag')
      .doc(userId).get().then((snapshot) => {
        if (snapshot) {
          setTags(snapshot.data());
        }
    })
}
