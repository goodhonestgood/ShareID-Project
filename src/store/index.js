import {createStore} from "vuex"

// firebase imports
import { auth } from '../firebase/config'
import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth'

// createStore : 새로운 store를 생성
const store = createStore({
    strict : process.env.NODE_ENV !== 'production',
    modules : {
    },

    state () {
        return {
            user: null,
            authIsReady: false,
        }
    },

    mutations : {
        setUser(state, data) {
            state.user = data
            console.log('user changed : ', state.user)
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
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
    },

    getters: {
        data: (state) => state.data,
    },
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    unsub()
})
export default store