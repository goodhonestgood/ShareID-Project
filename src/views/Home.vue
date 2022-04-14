<template>
<div class="container">
    <FilterNav />
    <div v-if="allChatRooms.length > 0" class="row">
        <div class="col-lg-4 col-sm-12 col-md-4 mb-2" v-for="room in allChatRooms" >
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{room.roomName}}</h5>
                    <p class="card-text">{{room.type}}</p>
                    <button @click="select(room)" class="btn btn-primary">방 들어가기</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else> 빈 방이 없습니다 </div>
    <ConfirmModal @close="toggleModal" :modalActive ="modalActive">
        <p>type: {{selectedRoom.roomName}}</p>
        <p>users: {{selectedRoom.users}}</p>
        <p>type: {{selectedRoom.type}}</p>
        <button @click="comein(selectedRoom)" class="btn btn-primary">방 들어가기</button>
    </ConfirmModal>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import FilterNav from '../components/FilterNav.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
    components: {
        FilterNav,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const allChatRooms = computed(() => store.state.ChatRoomModule.allChatRooms);
        const comein = (room) => {
            if (store.state.user !== null) {
                store.dispatch("ChatRoomModule/intoRoom", { roomId: room.roomId });
                router.push({ name: "ChatRoom", params: { id: room.roomId, roomName: room.roomName } });
            } else {
                router.push({name:"signIn"})
            }

        };
        
        const modalActive = ref(false)
        const toggleModal = () => {
            modalActive.value = !modalActive.value
        }

        const selectedRoom = ref({})
        const select = (room) => {
            selectedRoom.value = room
            toggleModal()
        }
        return { allChatRooms, comein, toggleModal, modalActive, select, selectedRoom};
    },
    components: { FilterNav, ConfirmModal }
}
</script>