import _log from './log.js'
import _copy, {copy2} from './jscopy/jscopy.js'
import _test from './unittest.js'

;(function(){
    //test config zone:
    const DIV_JS_OUTPUT_ZONE = 'JSOutputZone'
    let _testData = _test.data || _test.data1
    let _copyFunc = _copy || copy2

    function log(func, data) {
        return _log.printMsg(DIV_JS_OUTPUT_ZONE, func, data)
    }

    function handleEvent() {
        document.addEventListener('click', function(event) {
            let target = event.target
            console.log(target.id)
            switch(target.id) {
                case 'JSBtnShallowCopy':
                    console.log('shallow copy.')
                    log(_copyFunc.shallowCopy, _testData)
                    break;
                case 'JSBtnDeepCopy':
                    console.log('deep copy.')
                    log(_copyFunc.deepCopy, _testData)
                    break;
                default:
                    // throw new Error('no btn handler binded' + target.id)
                    break;
            }
        })
    }

    let init = () => {
        handleEvent()
    }
    init()
})();