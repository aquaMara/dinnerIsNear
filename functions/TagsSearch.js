import { getAuth } from 'firebase/auth';
import app from '../firebase-config';
import firebase from "firebase/compat";
import { useState } from 'react';

export const TagsSearch = (userId) => {

    const [tags, setTags] = useState();
    const auth = getAuth(app);
    console.log('USERID ', userId);

    firebase.firestore().collection('tag')
      .doc(userId).get().then((snapshot) => {
        if (snapshot) {
          console.log(snapshot.data());
          setTags(snapshot.data());
        }
    })

    console.log('TAGS ', tags);
}
