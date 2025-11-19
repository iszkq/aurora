(function(){
  var html=document.documentElement;
  var mode=html.className;
  if(mode==='system'){
    var m=window.matchMedia('(prefers-color-scheme: dark)');
    if(m.matches){html.classList.add('dark');}
    m.addEventListener('change',function(e){
      if(e.matches){html.classList.add('dark');}else{html.classList.remove('dark');}
    });
  }
})();