import { initializeApp } from "firebase/app";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  FirebaseStorage,
  getStorage,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  Firestore,
  CollectionReference,
  Query,
  DocumentData,
  collectionGroup,
  addDoc,
  WithFieldValue,
  doc,
  updateDoc,
  where,
  query,
  QuerySnapshot,
  getDocs,
} from "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
  auth: Auth;
  storage: FirebaseStorage;
  db: Firestore;
  collectionGroup: Query<DocumentData>;
  getCollection: CollectionReference<DocumentData>;
  getDoc: (
    id: string
  ) => Promise<
    QuerySnapshot<DocumentData>
  >;
  updateDoc: (
    id: string,
    values: any
  ) => Promise<void>;
  constructor() {
    const app = initializeApp(
      firebaseConfig
    );
    this.auth = getAuth(app);
    this.storage = getStorage(app);
    this.db = getFirestore(app);
    this.collectionGroup =
      collectionGroup(
        this.db,
        "pokemons"
      );
    this.getCollection = collection(
      this.db,
      "pokemons"
    );
    this.getDoc = (id) => {
      return getDocs(
        query(
          this.getCollection,
          where("user", "==", id)
        )
      );
    };
    this.updateDoc = (id, values) => {
      return updateDoc(
        doc(this.getCollection, id),
        values
      );
    };
  }

  async addFavorite(
    values: WithFieldValue<DocumentData>
  ) {
    await addDoc(
      collection(
        firebase.db,
        "pokemons"
      ),
      values
    );
  }

  async signin(
    email: string,
    password: string
  ) {
    const { user } =
      await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

    updateProfile(user, {
      displayName: email,
    });

    this.addFavorite({
      user: user.uid,
      favorites: [],
    });
  }

  async login(
    email: string,
    password: string
  ) {
    const newUser =
      await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
    return newUser.user;
  }

  async logout() {
    await firebase.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
