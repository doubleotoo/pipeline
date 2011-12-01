function getUrlVars(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function Pipeline () {
}

Pipeline.functionQueue = [];

Pipeline.queue = function (f) {
  Pipeline.functionQueue.push(f);
};

Pipeline.executeQueue = function () {
  // the 'this' keyword refers to the object instance
  // you can access only 'privileged' and 'public' members

  while(Pipeline.functionQueue.length>0) {
    var f = Pipeline.functionQueue.shift();
    f();
  }
};

Pipeline.makeAsync = function(url, elem, type, data, callback) {
  $.ajax({
    type: type,
    url: url,
    relativeTo: elem,
    data: data,
    success: function(data){ //jQuery.proxy(function(data){
      eval(data.onload);
      Pipeline.executeQueue();
    },// this),
    complete: callback,
    dataType: 'json'
  });
  return false;
}

Pipeline.handleClick = function(e) {
  elem = e.target;
  if (!$(elem).is("a")) {
    elem = $(elem).parents("a");
  }
  rel = $(elem).attr('rel');
  href = $(elem).attr('ajaxify') || $(elem).attr('href');
  switch (rel) {
    case 'async':
      $.ajax({
        type: 'GET',
        url: href,
        relativeTo: elem,
  //      data: jQuery(form).serialize(),
        success: function(data){ //jQuery.proxy(function(data){
          eval(data.onload);
          Pipeline.executeQueue();
        },// this),
        dataType: 'json'
      });
      e.preventDefault();
    case 'async-post':
      $.ajax({
        type: 'POST',
        url: href,
        relativeTo: elem,
        data: getUrlVars(href),
        success: function(data){ //jQuery.proxy(function(data){
          eval(data.onload);
          Pipeline.executeQueue();
        },// this),
        dataType: 'json'
      });
      e.preventDefault();
  default:
    return;
  }
  e.preventDefault();
}

Pipeline.handleSubmit = function(e)  {
  elem = e.target;
  if (elem.nodeName != "FORM") elem = e.currentTarget; // for IE
  if (!elem || elem.nodeName!= "FORM" || $(elem).attr('rel') != "async") return;
  rel = $(elem).attr("rel");
  href = $(elem).attr('action');
  $.ajax({
    type: 'POST',
    url: href,
    relativeTo: elem,
    data: jQuery(elem).serialize(),
    success: function(data){ //jQuery.proxy(function(data){
      eval(data.onload);
      Pipeline.executeQueue();
    },// this),
    dataType: 'json'
  });         
  e.preventDefault();
}

Pipeline.setup = function () {
  $("input").click(Pipeline.handleClick);
  $("a").click(Pipeline.handleClick);
  $("form").submit(Pipeline.handleClick);
};

$(function() {
  Pipeline.setup();
})
