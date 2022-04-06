<template>
    <div>방이름 : {{roomName}}</div>
    <div class="card border-secondary chat-shape bg-light position-relative">
        <div class="position-absolute top-0 start-0 w-100">
            <ul class="list-unstyled">
                <li v-for="(chat,index) in chats" :key="index">
                    <div v-if="ifme(chat.user)" class="fs-6 d-flex flex-row-reverse bd-highlight end-0">
                        <div class="p-2 bd-highlight">{{onlyID(chat.user)}}</div>
                        <div class="p-2 bd-highlight">{{chat.text}}</div>
                        <!-- <div class="p-2 bd-highlight">{{chat.text}}</div> -->
                    </div>
                    <div v-else class="fs-6 d-flex flex-row bd-highlight start-0">
                        <div class="p-2 bd-highlight">{{onlyID(chat.user)}}</div>
                        <div class="p-2 bd-highlight">{{chat.text}}</div>
                        <!-- <div class="p-2 bd-highlight">{{chat.text}}</div> -->
                    </div>
                </li>
                <div ref="bottom"></div>
            </ul>
        </div>
        <div class="form-send position-absolute start-0 bottom-0 w-100">
            <form @submit.prevent="chatAdd">
                <input class="w-75" type="text" v-model="inputText" />
                <input class="w-25" type="submit" value="보내기" />
            </form>
        </div>
    </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue';
import { useStore } from "vuex"
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { db } from '../firebase/config'
import { collectionGroup, query, where, onSnapshot, orderBy } from "firebase/firestore";

export default {
    props: ['id','roomName'],
    setup() {
        const inputText = ref('')
        const route = useRoute()
        const store = useStore()
        const my_email = store.state.user.email
        // Write
        const chatAdd = () => {
            store.dispatch('ChatModule/addChat', { roomId: route.params.id, text: inputText.value })
            inputText.value = ''
        }

        // Update
        const chats = ref([])
        const messages_query = query(collectionGroup(db,'messages'), where('roomId', '==', route.params.id), orderBy("time"))
        const unscribe = onSnapshot(messages_query, (querySnapshot) => {
            const temp = [];
            querySnapshot.forEach((doc) => {
                temp.push(doc.data());
            });
            chats.value = temp;
            console.log(chats.value)
        });

        const ifme = (user) => my_email == user;

        const onlyID = (user) => user.slice(0,user.indexOf('@'));

        const bottom = ref(null);
        watch(chats, () => {
            nextTick(() => {
                bottom.value?.scrollIntoView({behavior:'smooth'})
            })
        }, {deep:true})

        return { inputText, chatAdd, chats, ifme, onlyID }
    },
}
</script>

<style scoped>
.chat-shape {
    max-width: 360px;
    height: 550px;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
}

</style>