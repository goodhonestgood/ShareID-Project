<template>
    <div class="chatlist">
        <div v-if ="types.length">
            <p># 방 만들기</p>
            <form @submit.prevent="handleMake">
                <input class="form-control me-2 mb-2 text-secondary" type="text" placeholder="방 이름 입력" aria-label="input" v-model="roomName">
                <div v-for="type in types">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" :value="type" v-model="selectedType">
                        <label class="form-check-label" for="inlineRadio1">{{type}}</label>
                    </div>
                </div>

                <button class="btn btn-outline-secondary" type="submit"> OK </button>
            </form>
            <hr />
        </div>
        <p># 내 채팅 목록</p>
        <div v-if="chatLists" class="list-group">
            <div class="mb-2" v-for="list in chatLists">
                <router-link class="list-group-item list-group-item-action" :to="{ name: 'ChatRoom', params: { id: list.roomId, roomName: list.roomName }}">{{list.roomName}} | {{list.type}}</router-link>
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
        const roomType = ref("")
        const store = useStore()
        // roomOfUser로 만들 수 있는 타입만 보이게 하기
        const types = computed(()=>{
            let result = []
            let dict = store.state.ChatRoomModule.roomOfUser
            for(let val in dict) {
                if (dict[val] == false) {
                    result.push(val)
                } 
            }
            console.log(result)
            return result
        })
        const selectedType = ref("")

        let chatLists = computed(() => store.state.ChatRoomModule.chatRooms)
        const handleMake = async () => {
            console.log(roomName.value, selectedType.value)
            try {
                await store.dispatch('ChatRoomModule/chatRoomMake', { roomName: roomName.value, type: selectedType.value})
                roomName.value = ""
                roomType.value = ""
                chatLists = computed(() => store.state.ChatRoomModule.chatRooms)
            } catch(err) {
                alert(err)
            }
        }

        onMounted(() => {
          store.dispatch('ChatRoomModule/getRoom')
        }) 
        return { onMounted, roomName, roomType, chatLists, handleMake, types, selectedType }
    },
}
</script>