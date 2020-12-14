import firebase from 'firebase/app'
import 'firebase/database';

const config = {
  apiKey: process.env.GATSBY_API_KEY,
  databaseURL: process.env.GATSBY_DATABASE_URL,
  projectId: process.env.GATSBY_PROJECT_ID,
}


class Firebase {
  constructor () {
     if (typeof window !== 'undefined') {
      firebase.initializeApp(config)
     }
  }
}

export default new Firebase()
