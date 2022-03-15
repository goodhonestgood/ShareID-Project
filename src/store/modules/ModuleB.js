export default {
    namespaced: true,
    state: {
        data: "moduleB data"
    },
    mutations: {
        setData(state, data){
            state.data = data;
        },
    },
    actions: {
        setRootData({ commit }, data) {
            console.log("module B set Root Data")
            commit("setData", data)
        },
    },
    getters: {
        data: (state) => state.data,
    }
}