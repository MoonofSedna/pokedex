import { initializeApp } from "firebase/app";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  Firestore,
  CollectionReference,
  DocumentData,
  addDoc,
  WithFieldValue,
  doc,
  updateDoc,
  where,
  query,
  QuerySnapshot,
  getDocs,
} from "firebase/firestore";
// config
import firebaseConfig from "./config";

class Firebase {
  auth: Auth;
  db: Firestore;
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
    this.db = getFirestore(app);
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

  async addFavorites(
    values: WithFieldValue<DocumentData>
  ) {
    await addDoc(
      collection(this.db, "pokemons"),
      values
    );
  }

  async updateFavorites(
    id: string,
    favList: number[]
  ) {
    const getFavList =
      await firebase.getDoc(id);

    if (getFavList.docs[0]?.id) {
      await firebase.updateDoc(
        getFavList.docs[0]?.id,
        {
          favorites: favList,
        }
      );
    }
  }

  async signin(
    email: string,
    password: string
  ) {
    const { user } =
      await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

    updateProfile(user, {
      displayName: email,
    });

    this.addFavorites({
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
        this.auth,
        email,
        password
      );
    return newUser.user;
  }

  async logout() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
