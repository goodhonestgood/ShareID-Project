import { db } from '../../firebase/config'
import crypto from 'crypto-js'
import {
    addDoc, Timestamp, collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, limit, orderBy
} from "firebase/firestore"


const state = {

}

const mutations = {

}

const actions = {
    
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