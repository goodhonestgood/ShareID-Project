const state = {
    chatRooms: [],
    allChatRooms: [],
}
const mutations = {
    setRoom(state, payload) {
        state.chatRooms.unshift(...payload)
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

        const q = query(collection(db, "chatlist"), where("users", "array-contains", context.state.user.email));
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
            users: [context.state.user.email],
            maker: context.state.user.email,
            roomId: crypto.SHA256(roomName+Timestamp.now().toString()).toString(),
            roomName: roomName,
            type: 'Wavve',
            state: false,
            makeTime: Timestamp.now()
        }
        
        const docRef = await addDoc(collection(db, "chatlist"), q);
        context.commit('setRoom', [{
            roomId: q.roomId,
            roomName: q.roomName,
            maker: context.state.user.email,
            state: q.state,
            type: q.type,
            users: q.users,
            makeTime: q.makeTime,
        }])
    },
    async getAllRoom(context) { // 인원 부족한 방 
        console.log('all room action')
        const q = query(collection(db, "chatlist"), where("state","==", false), limit(10))
        const allRef = await getDocs(q)
        let tmp = []
        allRef.forEach(doc=>{
            if(doc.data().users.indexOf(context.state.user.email)<0) tmp.push(doc.data());
        })
        if(tmp.length > 0) context.commit('setAllRoom', tmp);
        else console.log( '빈 방이 없습니다.')
    },
    // 여기 부터!!!
    async intoRoom(context, { roomId }) { // 인원 부족한 방 중에 들어갈때
        console.log('into the room action : ', roomId)
        
        const q = query(collection(db, "chatlist"), where("roomId","==", roomId),limit(1))
        const aDoc = await getDocs(q)
        
        const theRoom = doc(db,"chatlist",aDoc[0].doc().id);

        await updateDoc(theRoom, {
            users: arrayUnion(context.state.user.email)
        });
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

