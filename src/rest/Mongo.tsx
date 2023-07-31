import { createContext, useContext, useEffect, useState } from "react";
import { useRealmApp } from "../Realm";

export interface MongoProviderProps{
    label:string;
    children: React.ReactNode
}
const MongoContext = createContext<globalThis.Realm.Services.MongoDBDatabase | null>(null);

export function useMongoDB(collection: string) {
    const mdbContext = useContext(MongoContext);
    if (mdbContext == null) {
        throw new Error("useMongoDB() called outside of a MongoDB?");
    }
    const doc = mdbContext.collection(collection);
    console.log('mdb context', doc)
    return doc;
};

export const MongoDBProvider = ( props: MongoProviderProps ) => {
    const { currentUser } = useRealmApp();
    const [db, setDB] = useState<globalThis.Realm.Services.MongoDBDatabase | null>(null);
    useEffect(() => {
        if (currentUser) {
            const realmService = currentUser.mongoClient("mongodb-atlas");
            setDB(realmService.db("photopoll"));
        }
    }, [currentUser]);

    return (
        <MongoContext.Provider value={db}>{props.children}</MongoContext.Provider>
    );
};

