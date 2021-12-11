import { initializeApp } from '@firebase/app';
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc
} from "@firebase/firestore";
import firebaseConfig from './Secrets';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
class DataModel {
  groupId: string;
  map: Map<string, Set<string>>;

  constructor(groupId:string) {
    this.groupId = groupId;
    this.map = new Map<string, Set<string>>();
  }

  async fetchUsers() {
    const docRef = doc(db, "Users", this.groupId);
    const docSnap  = await getDoc(docRef);
    if (docSnap.exists()){ 
      return new Set<string>(docSnap.data().users);
    }
    return null;
  }

  async updateUsers(users: Set<String>) {
    const docRef = doc(db, "Users", this.groupId);
    setDoc(docRef, {"users": Array.from(users)});
  }

  async fetchData(rows:Array<string>, cols:Array<string>) {
    for (const row of rows) {
      for (const col of cols) {
        this.map.set(`${col}-${row}`, new Set<string>());
      }
    } 
    const docRef = doc(db, "Events", this.groupId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){ 
      const data = docSnap.data();
      for (const key in data) {
        this.map.set(key, new Set<string>(data[key]));
      }
      return this.map;
    }
    return null;
  }

  async addItem(key:string, newUser:string) {
    let currentSet = this.map.get(key);
    currentSet!.add(newUser);
    const docRef = doc(db, `Events`, `${this.groupId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      updateDoc(docRef, {[key]: Array.from(currentSet!)}); 
    } else {
      setDoc(docRef, {[key]: Array.from(currentSet!)})
    }
    this.map.set(key, currentSet!);
  }

  async deleteItem(key:string, newUser:string) {
    let currentSet = this.map.get(key);
    currentSet!.delete(newUser);
    this.map.set(key, currentSet!);
    const docRef = doc(db, `Events`, `${this.groupId}`);
    updateDoc(docRef, {[key]: Array.from(currentSet!)});
  }
}

let dataModel:DataModel | undefined = undefined;

export function getDataModel(groupId?:string) {
  if (!dataModel) {
    dataModel = new DataModel(groupId!);
  }
  return dataModel;
}

export function resetDataModel() {
  dataModel = undefined;
}
