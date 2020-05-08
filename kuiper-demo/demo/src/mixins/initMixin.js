
let initMixin = {
    created() {
        console.log('initMixin created')
    },
    mixins: [],
    methods: {
        async init() {
            await this.$store.dispatch('user/setUserInfo')
        },
    }
}

export default initMixin
