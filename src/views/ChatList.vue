<template>
    <div class="chatlist">
        <p># 방 만들기</p>
        <form @submit.prevent="handleMake">
            <input class="form-control me-2 mb-2 text-secondary" type="text" placeholder="방 이름 입력" aria-label="input" v-model="roomName">
            <button class="btn btn-outline-secondary" type="submit"> OK </button>
        </form>
        <hr />
        <p># 내 채팅 목록</p>
        <div v-if="chatLists" class="list-group">
            <div class="mb-2" v-for="list in chatLists">
                <!-- named route -->
                <router-link class="list-group-item list-group-item-action" :to="{ name: 'ChatRoom', params: { id: list.roomId }}">{{list.roomName}}</router-link>
            </div>
        </div>
        <div v-else>
            채팅목록이 없습니다.
        </div>
    </div>
</template>

<script>
import { onMounted, computed, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    setup() {
        const roomName = ref("")
        const store = useStore()

        let chatLists = computed(() => store.state.chatRooms)
        const handleMake = async () => {
            try {
                await store.dispatch('chatRoomMake', { roomName: roomName.value })
                roomName.value = ""
                chatLists = computed(() => store.state.chatRooms)
            } catch(err) {
                alert(err)
            }
        }
        return { onMounted, roomName, chatLists, handleMake }
    },
}
</script>