import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    getToken: (state) => `Bearer ${state.token}`,
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    async fetchUser() {
      const token = this.getToken
      try {
        const { data } = await axios.get('/api/user/', {
          headers: { Authorization: token }
        })
        this.setUser(data)
        return this.user
      } catch (error) {
        console.log(error)
      }
    },
    setToken(token) {
      this.token = token
    },
    setCheckIns(payload) {
      if (!this.user) return
      this.user.check_ins = payload
    },
    addCheckIn(payload) {
      if (!this.user) return
      this.user.check_ins.push(payload)
    },
    clearUser() {
      this.user = undefined
      this.token = undefined
    }
  }
})

export default useUserStore
