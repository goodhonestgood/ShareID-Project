<template>
    <transition name="modal-animation">
        <div class="ConfirmModal" v-show="modalActive">
            <transition name="modal-animation-inner">
                <div v-show="modalActive" class="modal-inner">
                    <i @click="close" class="far fa-times-circle"></i>
                    <!--modal content-->
                    <h4 class="mb-4">※ 이 방의 정보</h4>
                    <slot/>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>

export default {
    props: ['modalActive'],
    setup(props, {emit}) {
        const close = () => {
            emit('close')
        }

        return {close}
    }
}
</script>

<style lang="scss" scoped>
.ConfirmModal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left :0;
    background-color: rgba(255,255,255,0.8);

    .modal-inner {
        position: relative;
        max-width: 540px;
        width: 80%;
        box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1);
        background-color: #fff;
        padding: 64px 16px;

        i {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;

            &:hover {
                color: crimson;
            }
        }
    }

    button {
        padding: 10px 30px;
        border: none;
        font-size: 16px;
        background-color: crimson;
        color: #fff;
        cursor: pointer;
    }
}
.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}

.modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}
.modal-animation-inner-leave-to {
    transform: scale(0.8);
}
</style>