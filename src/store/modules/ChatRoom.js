import { db } from '../../firebase/config'
import crypto from 'crypto-js'
import {
    addDoc, Timestamp, collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, limit, orderBy
} from "firebase/firestore"

const state = {
    chatRooms: [],
    allChatRooms: [],
}
const mutations = {
    setRoom(state, payload) {
        state.chatRooms = payload
        console.log('User Rooms append : ', state.chatRooms)
    },
    setAllRoom(state, payload) {
        state.allChatRooms = payload
        console.log('All Rooms append : ', state.allChatRooms[0])
    }
}
const actions = {
    async getRoom(context) {
        console.log('get room action')

        const q = query(collection(db, "chatlist"), where("users", "array-contains", context.rootState.user.email));
        const querySnapshot = await getDocs(q);

        let tmp = []
        querySnapshot.forEach(doc=>{
            tmp.push(doc.data())
        })
        context.commit('setRoom', tmp)
    },
    async chatRoomMake(context , { roomName, type }){
        console.log('chatRoomMake action')
        const q = {
            users: [context.rootState.user.email],
            maker: context.rootState.user.email,
            roomId: crypto.SHA256(roomName+Timestamp.now().toString()).toString(),
            roomName: roomName,
            type: type,
            state: false,
            makeTime: Timestamp.now()
        }
        
        const docRef = await addDoc(collection(db, "chatlist"), q);
        context.dispatch('getRoom')
    },
    async getAllRoom(context, {type}) { // 인원 부족한 방 
        console.log('all room action')
        let q = null
        if (type !== 'All') {
            q = query(collection(db, "chatlist"), where("state","==", false), where("type", "==", type), limit(10)) // 일단 10개로 제한
        } else {
            q = query(collection(db, "chatlist"), where("state","==", false), limit(10)) // 일단 10개로 제한
        }
        const allRef = await getDocs(q)
        let tmp = []
        allRef.forEach(doc=>{
            if(doc.data().users.indexOf(context.rootState.user.email)<0) tmp.push(doc.data());
        })
        context.commit('setAllRoom', tmp);
    },

    async intoRoom(context, { roomId }) { // 인원 부족한 방 중에 들어갈때
        console.log('into the room action : ', roomId)
        try {
            const q = query(collection(db, "chatlist"), where("roomId","==", roomId),limit(1))
            const aDoc = await getDocs(q)
            let aid = ""
            aDoc.forEach(doc=>{
                aid = doc.id
            })

            const theRoom = doc(db,"chatlist",aid);
            await updateDoc(theRoom, {
                users: arrayUnion(context.rootState.user.email)
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        
    }
}
const getters = {
    
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

