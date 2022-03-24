<template>
<!--state == false인  채팅 방 보기-->
<div class="container">
    <div v-if="allChatRooms.length > 0" class="row">
        <div class="col-lg-4 col-sm-12 col-md-4 mb-2" v-for="room in allChatRooms" >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{room.type}}</h5>
                    <p class="card-text">{{room.state}}</p>
                    <button @click="comein(room.roomId)" class="btn btn-primary">방 들어가기</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else> 빈 방이 없습니다 </div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'

export default {
    setup() {
        const store = useStore()

        const allChatRooms = computed(() => store.state.ChatRoomModule.allChatRooms)
        const comein = (roomId) => {
          store.dispatch('ChatRoomModule/intoRoom', {roomId:roomId})
        }

        onMounted(() => {
          store.dispatch('ChatRoomModule/getAllRoom')
        }) 
        return {allChatRooms , comein}
    }
}
</script>