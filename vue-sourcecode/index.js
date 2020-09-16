let Component = Vue.extend({
    template: '<div>test</div>'
})
new Component().$mount('#app')

let SuperComponent = Vue.extend(Component) 
new SuperComponent({
    created() {
        console.log(1);
    }
})
new SuperComponent().$mount('#app')

