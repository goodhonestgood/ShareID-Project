import { db } from '../../firebase/config'
import crypto from 'crypto-js'
import {
    setDoc, Timestamp, collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, limit, orderBy, collectionGroup
} from "firebase/firestore"

const getId = async (chatlist, roomId) => {
    const q = query(chatlist, where("roomId","==", roomId),limit(1))
    let aid = ""
    const aDoc = await getDocs(q)
    aDoc.forEach(doc=>{
        aid = doc.id
    })
    console.log(aid)
    return aid
}

const state = {

}

const mutations = {

}

const actions = {
    // 여기부터
    async addChat(context, { roomId, text }) {
        try {
            const chatlist = collection(db, 'chatlist')
            const aid = await getId(chatlist, roomId)
            await setDoc(doc(chatlist, "0320test", "messages"), { // error
                user: context.rootState.user.email,
                text: text,
                time: Timestamp.now(),
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

const getters = {

}



export default {
    namespaced : true,
    state,
    mutations,
    actions,
    getters,
}