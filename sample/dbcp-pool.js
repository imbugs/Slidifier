var g_elem=[];
var g_elem_map = {};

var stateMachineConnector = {
	connector:"StateMachine",
	paintStyle:{lineWidth:3,strokeStyle:"#056"},
	hoverPaintStyle:{strokeStyle:"#dbe300"},
	endpoint:"Blank",
	anchor:"Continuous",
	overlays:[ ["PlainArrow", {location:1, width:20, length:12} ]]
};
jsPlumb.ready(function() {

	jsPlumb.setRenderMode(jsPlumb.CANVAS);


    $('.node').each(function(i,e) {
        var left= 150 * i + 25;
        $(e).css('left',left+'px');
				var id = $(e).attr('id');

if($(e).hasClass('tofill')) { return; }

		if (i > 0) {
			var line = jsPlumb.connect({ source:g_elem[i-1].id, target: id }, stateMachineConnector);
			g_elem[i-1].line = line;
		}

		var node= {obj: e, id: id, line: null, pos: $(e).position()};
		g_elem.push(node);
		g_elem_map[id] = node;
    });
    resetHeadAndTail();

});

var pointerConnector = {
	connector:"StateMachine",
	paintStyle:{lineWidth:1,strokeStyle:"red"},
	hoverPaintStyle:{strokeStyle:"#dbe300"},
	endpoint:"Blank",
	anchor:"Continuous",
	overlays:[ ["PlainArrow", {location:1, width:20, length:12} ]]
};

function resetTail() {
	if (g_elem.length > 0) {
		jsPlumb.detachAllConnections('tail');
		jsPlumb.connect({ source:'tail', target: g_elem[g_elem.length-1].id }, pointerConnector);
	}
}

function resetHead() {
	if (g_elem.length > 0) {
		jsPlumb.detachAllConnections('head');
		jsPlumb.connect({ source:'head', target: g_elem[0].id }, pointerConnector);
	}
}

function resetHeadAndTail() {
	resetHead();
	resetTail();
}