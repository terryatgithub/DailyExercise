var HashObj = {
    isHashSupported: () => {
        return ("onhashchange" in window)
    },
    onHashChange: (e) => {
        console.log(`hash changed: ${location.hash}`)
        var _hash = location.href.split('#')[1]
        router.push(_hash)
    }
}

var router = {
    routes: ['home', 'award', 'seckill'],
    push(path) {
        alert(path)
        $('#homePage').hide()
        $('#awardPage').hide()
        $('#seckillPage').hide()
        $('#rulePage').hide()
        switch(path) {
            case "home":
                $('#homePage').show()
                break;
            case "award":
                $('#awardPage').show()
                break;
            case "seckill":
                $('#seckillPage').show()
                break;    
        }
    }
}

var api = {
    count: 0,
    _onClick: function() {
        var count = this.count
        return function() {
            count = ++count >= 3 ? 0 : count
            var loc = window.location.href.split('#')[0]
            window.location.href = loc + `#${router.routes[count]}`    
        }
    },
    onClick: function() {
        return this._onClick()
    }
}

$(function() {
    alert('hashchange support? ' + HashObj.isHashSupported())
    $(window).on('hashchange', HashObj.onHashChange)
    // $('#Btn').on('click', api.onClick().bind(api))
    $(document).on('click', function() {
        console.log('onclick. event: ', event)
        switch(event.target.id) {
            case "Btn":
                api.onClick()
                break;
        }
    })
});