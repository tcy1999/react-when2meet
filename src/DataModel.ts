import { initializeApp } from '@firebase/app';
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc
} from "@firebase/firestore";
import firebaseConfig from './Secrets';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type listenerType = {
  id: string,
  callback: () => void
}
  
class DataModel {
  groupId: string;
  map: Map<string, Set<string>>;
  mapListener: Array<listenerType>;
  users: Set<string>;

  constructor(groupId:string, rows:Array<string>, cols:Array<string>) {
    this.groupId = groupId;
    this.map = new Map<string, Set<string>>();
    for (const row of rows) {
      for (const col of cols) {
        this.map.set(`${col}-${row}`, new Set<string>());
      }
    } 
    this.mapListener = [];
    this.users = new Set<string>();
  }

  async fetchUsers() {
    const docRef = doc(db, "Users", this.groupId);
    const docSnap  = await getDoc(docRef);
    if (docSnap.exists()){ 
      this.users = new Set<string>(docSnap.data().users);
    }
  }

  updateUsers(newUser: string) {
    this.users.add(newUser);
    const docRef = doc(db, "Users", this.groupId);
    setDoc(docRef, {"users": Array.from(this.users)});
    this.notifyListener();
  }

  async fetchData() {
    const docRef = doc(db, "Events", this.groupId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){ 
      const data = docSnap.data();
      for (const key in data) {
        this.map.set(key, new Set<string>(data[key]));
      }
      this.notifyListener();
    }
  }

  async addItem(key:string, newUser:string) {
    let currentSet = this.map.get(key);
    currentSet!.add(newUser);
    this.map.set(key, currentSet!);
    this.notifyListener();

    const docRef = doc(db, `Events`, `${this.groupId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      updateDoc(docRef, {[key]: Array.from(currentSet!)}); 
    } else {
      setDoc(docRef, {[key]: Array.from(currentSet!)})
    }
  }

  deleteItem(key:string, newUser:string) {
    let currentSet = this.map.get(key);
    currentSet!.delete(newUser);
    this.map.set(key, currentSet!);
    this.notifyListener();

    const docRef = doc(db, `Events`, `${this.groupId}`);
    updateDoc(docRef, {[key]: Array.from(currentSet!)});
  }
  
  addListener(id:string, callbackFunction:() => void) {
    const listener = {
      id: id,
      callback: callbackFunction
    }
    this.mapListener.push(listener);
    callbackFunction();
  }

  removeListener(listenerId:string) {
    let idx = this.mapListener.findIndex((elem:listenerType) => elem.id === listenerId);
    this.mapListener.splice(idx, 1);
  }

  notifyListener() {
    for (const tl of this.mapListener) {
      tl.callback();
    }
  }
}

let dataModel:DataModel | undefined = undefined;

export function getDataModel(groupId?:string, rows?:Array<string>, cols?:Array<string>) {
  if (!dataModel) {
    dataModel = new DataModel(groupId!, rows!, cols!);
  }
  return dataModel;
}

export function resetDataModel() {
  dataModel = undefined;
}
