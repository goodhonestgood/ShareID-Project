<template>
<!--state == false인  채팅 방 보기-->
<div class="container">
    <FilterNav />
    <div v-if="allChatRooms.length > 0" class="row">
        <div class="col-lg-4 col-sm-12 col-md-4 mb-2" v-for="room in allChatRooms" >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{room.roomName}}</h5>
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
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import FilterNav from '../components/FilterNav.vue'

export default {
    components: {
        FilterNav,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const allChatRooms = computed(() => store.state.ChatRoomModule.allChatRooms);
        const comein = (roomId) => {
            store.dispatch("ChatRoomModule/intoRoom", { roomId: roomId });
            router.push({ name: "ChatRoom", params: { id: roomId } });
        };
        onMounted(() => {
            store.dispatch("ChatRoomModule/getAllRoom", {type: 'All'});
        });
        return { allChatRooms, comein };
    },
    components: { FilterNav }
}
</script>