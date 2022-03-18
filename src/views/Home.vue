<template>
<div class="container">
    <div class="row">
        <div class="col-lg-4 col-sm-12 col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button @click="comein" class="btn btn-primary">초대하기</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
    name: 'Home',
    setup() {
        const store = useStore()

        const comein = () => {
            
        }
        return {comein}
    }
}
</script>