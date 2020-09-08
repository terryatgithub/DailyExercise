var observer = new PerformanceObserver(function(list, obj) {
    var entries = list.getEntries()
    for (var i = 0, len = entries.length; i < len; i++) {
        console.log(`${i} => ${JSON.stringify(entries[i])}`)
    }
})
observer.observe({entryTypes: ["mark"]})

var observer2 = new PerformanceObserver(perf_observer)
function perf_observer(list, observer) {
    console.log({list})
}
observer2.observe({entryTypes: ["measure"]})

var observer3 = new PerformanceObserver(paint_observer)
function paint_observer(list, observer) {
    console.log({list})
    debugger
}
observer3.observe({entryTypes: ['paint']})

function print_PerformanceEntries() {
    var entries = performance.getEntries()
    for (var i = 0, len = entries.length; i < len; i++) {
        console.log(`PerformanceEntry[${i}]`)
        print_PerformanceEntry(entries[i])
    }
}
function print_PerformanceEntry(perfEntry) {
    var properties = [
        "name", 
        "entryType",
        "startTime",
        "duration"
    ]
    properties.forEach(prop => {
        var supported = prop in perfEntry
        if (supported) {
            console.log(`...${prop} = ${perfEntry[prop]}`)
        } else {
            console.log(`...${prop} is NOT supported.`)
        }
    })
}


performance.mark("squirrel")
performance.mark("squirrel")
performance.mark("monkey")
performance.mark("monkey")
performance.mark("dog")
performance.mark("dog")
const entries = performance.getEntries()
console.log({entries})
const allEntries = performance.getEntriesByType("mark")
console.log({allEntries})
const monkeyEntries = performance.getEntriesByName("monkey")
console.log({monkeyEntries})


const markerA = 'example-mark-A'
const markerB = 'example-mark-B'
performance.mark(markerA)
setTimeout(function() {
    performance.mark(markerB)
    setTimeout(function() {
        performance.measure('measure a to b', markerA, markerB)
        performance.measure('measure a to now', markerA)
        performance.measure('measure from navagation start to b', undefined, markerB)
        performance.measure('measure from the start of navagation to now')
        console.log(performance.getEntriesByType('measure'))
        performance.clearMarks()
        performance.clearMeasures()
    })

}, 1000)

function showPaintTimings() {
    if (window.performance) {
        let performance = window.performance
        let p = performance.getEntriesByType('paint')
        p.forEach(item => {
            console.log(`[paint] ${JSON.stringify(item)}`)
        })
    } else {
        console.log('performance is NOT supported.')
    }
}
showPaintTimings()

function calculate_load_times() {
    // Check performance support
    if (performance === undefined) {
      console.log("= Calculate Load Times: performance NOT supported");
      return;
    }
  
    // Get a list of "resource" performance entries
    var resources = performance.getEntriesByType("resource");
    if (resources === undefined || resources.length <= 0) {
      console.log("= Calculate Load Times: there are NO `resource` performance records");
      return;
    }
  
    console.log("= Calculate Load Times");
    for (var i=0; i < resources.length; i++) {
      console.log("== Resource[" + i + "] - " + resources[i].name);
      // Redirect time
      var t = resources[i].redirectEnd - resources[i].redirectStart;
      console.log("... Redirect time = " + t);
  
      // DNS time
      t = resources[i].domainLookupEnd - resources[i].domainLookupStart;
      console.log("... DNS lookup time = " + t);
  
      // TCP handshake time
      t = resources[i].connectEnd - resources[i].connectStart;
      console.log("... TCP time = " + t);
  
      // Secure connection time
      t = (resources[i].secureConnectionStart > 0) ? (resources[i].connectEnd - resources[i].secureConnectionStart) : "0";
      console.log("... Secure connection time = " + t);
  
      // Response time
      t = resources[i].responseEnd - resources[i].responseStart;
      console.log("... Response time = " + t);
  
      // Fetch until response end
      t = (resources[i].fetchStart > 0) ? (resources[i].responseEnd - resources[i].fetchStart) : "0";
      console.log("... Fetch until response end time = " + t);
  
      // Request start until reponse end
      t = (resources[i].requestStart > 0) ? (resources[i].responseEnd - resources[i].requestStart) : "0";
      console.log("... Request start until response end time = " + t);
  
      // Start until reponse end
      t = (resources[i].startTime > 0) ? (resources[i].responseEnd - resources[i].startTime) : "0";
      console.log("... Start until response end time = " + t);
    }
  }



// performance.clearMarks()