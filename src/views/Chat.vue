<template>
    <div class="card border-secondary chat-shape bg-light">
        <div class="">
            <ul class="">
                <li v-for="(chat,index) in chats" :key="index">
                    <div v-if="ifme(chat.authId)" class="fs-6 d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">{{chat.authId[0]}}</div>
                        <div class="p-2 bd-highlight">{{chat.text}}</div>
                        <!-- <div class="p-2 bd-highlight">{{chat.text}}</div> -->
                    </div>
                    <div v-else class="fs-6 d-flex flex-row bd-highlight">
                        <div class="p-2 bd-highlight">{{chat.authId[0]}}</div>
                        <div class="p-2 bd-highlight">{{chat.text}}</div>
                        <!-- <div class="p-2 bd-highlight">{{chat.text}}</div> -->
                    </div>
                </li>
                <div ref="bottom"></div>
            </ul>
        </div>
        <div class="form-send">
            <form @submit.prevent="chatAdd">
                <input class="w-75" type="text" v-model="inputText" />
                <input class="w-25" type="submit" value="보내기" />
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from "vuex"
import { useRoute } from 'vue-router'
export default {
    setup() {
        const inputText = ref("")
        const route = useRoute()
        const store = useStore()
        const chatAdd = () => {
            store.dispatch('ChatModule/addChat', { roomId: route.params.id, text: inputText })
        }
        return { chatAdd }
    },
}
</script>