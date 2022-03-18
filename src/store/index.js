import {createStore} from "vuex"
import crypto from 'crypto-js'
// firebase imports
import { auth, db } from '../firebase/config'
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth'
import {
    addDoc, Timestamp, collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, limit
} from "firebase/firestore"

// createStore : 새로운 store를 생성
const store = createStore({
    strict : process.env.NODE_ENV !== 'production',
    modules : {
    },

    state () {
        return {
            user: null,
            authIsReady: false,
            chatRooms: [],
            allChatRooms: [],
        }
    },

    mutations : {
        setUser(state, data) {
            state.user = data.email
            console.log('user changed : ', state.user)
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        },
        setRoom(state, payload) {
            state.chatRooms.push(...payload)
            console.log('user Rooms append : ', state.chatRooms)
        },
        setAllRoom(state, payload) {
            state.allChatRooms = payload
        }
    },

    // action에서는 mutations에서는 하지 못하는 ajax와 같이 비동기식 처리를 한다
    actions: {
        async signUp(context, { email, password }) {
            console.log('signup action')
            
            // async code
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error('could not complete signup')
            }
        },
        async login(context, { email, password }) {
            console.log('login action')
            
            // async code
            const res = await signInWithEmailAndPassword(auth, email, password)
            if (res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error('could not complete login')
            }
        },
        async logout(context){
            console.log('logout action')

            await signOut(auth)
            context.commit('setUser', null)
        },
        async getRoom(context) {
            console.log('get room action')

            const q = query(collection(db, "chatlist"), where("userEmail", "==", context.state.user));
            const querySnapshot = await getDocs(q);

            let tmp = []
            querySnapshot.forEach(doc=>{
                tmp.push(doc.data())
            })
            context.commit('setRoom', tmp)
        },
        async chatRoomMake(context , { roomName }){
            console.log('chatRoomMake action')
            const q = {
                userEmail: context.state.user,
                roomId: crypto.SHA256(roomName+Timestamp.now().toString()).toString(),
                roomName: roomName
            }
            
            const docRef = await addDoc(collection(db, "chatlist"), q);
            context.commit('setRoom', [{
                id:docRef.id,
                userEmail: q.userEmail,
                roomId: q.roomId,
                roomName: q.roomName
            }])
        },
        async getAllRoom(context) { // 인원 부족한 방 where("state","==", true),
            console.log('all room action')
            const q = query(collection(db, "chatlist"), orderBy("makeTime", "desc"), limit(3))
            const allRef = await getDocs(q)
            let tmp = []
            allRef.forEach(doc=>{
                tmp.push(doc.data())
            })
            context.commit('setAllRoom', tmp)
        },
        async intoRoom(context, { index }) { // 인원 부족한 방 중에 들어갈때
            console.log('into the room action')

            const allChatRoomRef = doc(db, "chatlist", index);

            // Atomically add a new region to the "regions" array field.
            await updateDoc(allChatRoomRef, {
                users: arrayUnion(context.state.user)
            });
        }
    },

    getters: {
    },
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    store.dispatch('getRoom')
})


/*
// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});*/
export default store