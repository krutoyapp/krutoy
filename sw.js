self.addEventListener("push",e=>{
  let d={};
  try{d=e.data.json()}catch(x){d={title:"krutoy",body:e.data?e.data.text():""}}
  e.waitUntil(self.registration.showNotification(d.title||"krutoy",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",data:{go:d.go||""}}));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const go=(e.notification.data||{}).go||"";
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{
    if(cs.length){cs[0].focus();cs[0].postMessage({go});return}
    return self.clients.openWindow(self.registration.scope+(go?"#"+go:""));
  }));
});
