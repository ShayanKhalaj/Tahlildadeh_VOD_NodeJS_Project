import MongoStore from "connect-mongo";

const sessionStore = (uri)=>{
    return MongoStore.create({
        mongoUrl:uri,
        autoRemove:'interval',
        autoRemoveInterval:10,
        collectionName:'sessions',
        dbName:'TahlildadehVOD',
        ttl:30*24*60*60*1000
    })
}


export const DbSetting = {sessionStore}
