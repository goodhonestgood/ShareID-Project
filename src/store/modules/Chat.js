import { db } from '../../firebase/config'
import crypto from 'crypto-js'
import {
    setDoc, Timestamp, collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, limit, orderBy, collectionGroup
} from "firebase/firestore"


const state = {

}

const mutations = {

}

const actions = {
    // 여기부터
    async addChat(context, { roomId, text }) {
        try {
            const chatlist = collection(db, 'chatlist')
            const q = query(chatlist, where("roomId","==", roomId),limit(1))
            const aDoc = await getDocs(q)
            let aid = ""
            aDoc.forEach(doc=>{
                aid = doc.id
            })

            await setDoc(doc(chatlist, aid, 'messages'), {
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