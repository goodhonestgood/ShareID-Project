import {createStore} from "vuex"
import crypto from 'crypto-js'
// firebase imports
import { auth, db } from '../firebase/config'
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth'
import {
    addDoc, Timestamp, collection, query, where, getDocs
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
            //const roomNames = context.state.chatRooms.map(c=>c.roomName)
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
            // 맞긴하지만 바로 가져오는 방법은 없는지 찾기
            const docRef = await addDoc(collection(db, "chatlist"), q);
            context.commit('setRoom', [{
                id:docRef.id,
                userEmail: q.userEmail,
                roomId: q.roomId,
                roomName: q.roomName
            }])
        },
    },

    getters: {
    },
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    store.dispatch('getRoom')
})
export default store