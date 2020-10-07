import * as firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

class FirebaseApi {
  private app: firebase.app.App;
  private database: firebase.database.Database;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.database = this.app.database();
  }

  public fetchBoard(update: React.Dispatch<React.SetStateAction<string[]>>): void {
    this.database.ref("board").on("value", (snapshot) => {
      update(Object.values(snapshot.val()));
    });
  }
}

export const firebaseApi: FirebaseApi = new FirebaseApi();
