const state = {
    data: "moduleA data",
}
const mutations = {
    setData(state, data){
        state.data = data;
    },
}
const actions = {
    setRootData({ commit }, data) {
        console.log("module A set Root Data")
        commit("setData", data)
    },
}
const getters = {
    data: (state) => state.data,
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

