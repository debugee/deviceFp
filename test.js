const deviceFP = require("./deviceFp")
const DeviceFpBehavior = require("./DeviceFpBehavior")
const http = require('http');

const port = 3000;
const hostname = "0.0.0.0"

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  var post = "";
  req.on('data', (chunk) =>{
    post += chunk
  });
  req.on('end', () => {
    var o = {}
    var resp = {"result":"failed"}
    try{
        o = JSON.parse(post)
        if (typeof o.m == "string"){
        if (o.m == "getDeviceFP")
            {
                var fp = deviceFP.getDeviceFP(o.addLocationHref, o.sessionID, o.userAgent, 
                  o.timeZoneOffset, o.useLanguages, 
                  o.timeZone, o.gpuData, 
                  o.gpuType, o.browserToDataURL,
                  o.navigatorPlatform, o.networkType,
                  o.networkDownLink, o.rttNet, o.pluginsNum)
                resp.fp = fp.toString()
                resp.result = "successed"
            }
        else if (o.m == "getDeviceFpBehavior")
          {
            var fp = DeviceFpBehavior.getDeviceFpBehavior(o.sessionID, o.pageUrl)
            resp.fp = fp.toString()
            resp.result = "successed"
          }
        }
    }catch(e){
        console.log(Date().toString() + post)
	console.log(e.stack)
	resp.result = "excepted"
        resp.stack = e.stack
    }
    res.end(JSON.stringify(resp))
  })
})

module.exports.start = ()=>{
  server.listen(port, hostname, () => {
  console.log(`server runing http://${hostname}:${port}/`);
});
}
module.exports.stop = ()=>{
  server.close((err)=>{
    console.log(`server stoped err:${err}`)
  })
  server.closeAllConnections()
}