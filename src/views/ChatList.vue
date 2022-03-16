<template>
    <div class="chatlist">
        <p># 방 만들기</p>
        <form @submit.prevent="handleRoom">
            <input class="form-control me-2 mb-2 text-secondary" type="text" placeholder="방 이름 입력" aria-label="input" v-model="roomName">
            <button class="btn btn-outline-secondary" type="submit"> OK </button>
        </form>
        <hr />
        <p># 내 채팅 목록</p>
        <div v-if="roomName != ''" class="list-group">
            <div class="mb-2" v-for="(name,index) in chatLists" :key="index">
                <a href="#" class="list-group-item list-group-item-action" @click="goRoom(index)">{{name.roomName}}</a>
            </div>
        </div>
        <div v-else>
            채팅목록이 없습니다.
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    setup() {
        const roomName = ref("");
        const store = useStore();

        const chatLists = computed(() => store.state.chatRooms)
        const handleMake = async () => {
            try {
                await store.dispatch('chatRoomMake', { roomName: roomName })
                router.push('/my-chat') // reload
            } catch(err) {
                alert(err)
            }
        }

        return { roomName, chatLists, handleMake }
    },
}
</script>