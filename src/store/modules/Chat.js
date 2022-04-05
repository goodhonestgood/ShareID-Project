import { db } from '../../firebase/config'
import { collection, doc, addDoc, query, where, limit, getDocs, Timestamp, collectionGroup, orderBy } from "firebase/firestore";

const getId = async (chatlist, roomId) => {
    const q = query(chatlist, where("roomId","==", roomId),limit(1))
    let aid = ""
    const aDoc = await getDocs(q)
    aDoc.forEach(doc=>{
        aid = doc.id
    })
    return aid
}

const state = {

}

const mutations = {

}

const actions = {
    async addChat(context, { roomId, text }) {
        try {
            const chatlist = collection(db, 'chatlist')
            const aid = await getId(chatlist, roomId)
            await addDoc(collection(doc(chatlist, aid), 'messages'), { // 하위컬렉션에 추가하기
                user: context.rootState.user.email,
                text: text,
                time: Timestamp.now(),
                roomId: roomId,
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    /*
    async updateChat(context, { roomId }) {
        try {
            const chatlist = collection(db, 'chatlist')
            const aid = await getId(chatlist, roomId)
            const q = query(collection(doc(chatlist, aid), 'messages'), orderBy("time"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const temp = [];
                querySnapshot.forEach((doc) => {
                    temp.push(doc.data());
                });
                return temp
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }*/
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