var table;
$(document).ready(function() {
    var filterCounter = 0;
    table = $('#chart1').DataTable( {
        data: phpData,
        fixedHeader: {
            header: true,
            footer: true
        },
        // autoWidth: false,
        "lengthMenu": [[50, 100, 200], [50, 100, 200]],
        "columns": phpColumnOptions,
        "order": [],
        "search": {regex: true},
        initComplete: function () {
            this.api().columns(phpFilterColumns).every( function () {
                var column = this;
                var select = $('<select id="'+String(filterCounter)+'" name="'+String(filterCounter)+'" multiple></select>')
                            .appendTo( $("#filterContainer") )
                var index = this.index();
                if (phpExactColumns.includes(index)){
                    select.on( 'change', function () {
                        var val = "";

                        $(this).val().forEach(function (item,index){
                            val += "^"+$.fn.dataTable.util.escapeRegex(item)+"$|";
                        });
                        
                        val = val.slice(0,-1);
                        
                        column
                            .search( (val ? val : ''), true, false )
                            .draw();
                    } );
                }else if(phpAndColumns.includes(index)){
                    select.on( 'change', function () {
                        var val = "";
                        $(this).val().forEach(function (item,index){
                            val += "(?=.*"+$.fn.dataTable.util.escapeRegex(item)+")";
                        });

                        column
                            .search( (val ? val : ''), true, false )
                            .draw();
                    } );
                }else{
                    select.on( 'change', function () {
                        var val = "";

                        $(this).val().forEach(function (item,index){
                            val += $.fn.dataTable.util.escapeRegex(item)+"|";
                        });
                        
                        val = val.slice(0,-1);
                        
                        column
                            .search( (val ? val : ''), true, false )
                            .draw();
                    } );
                }
                phpColumnValues[this.index()].sort(function compareFn(a, b) {
                    const _a = parseInt(a);
                    const _b = parseInt(b);
                    if (isNaN(_a)||isNaN(_b)) {
                        if (a.trim() == "S"){
                            if (b.trim()=="S") return 0;
                            else return -1;
                        }else{
                            return a.localeCompare(b);
                        }
                    }
                    return _a-_b;
                }).forEach(function (data, i, a){
                    select.append('<option value="'+data+'">'+data+'</option>');
                });
                var columnName = $(this.header()).html();
                select.multiSelect({noneText: columnName});
                
                filterCounter+=1;
                
                
            });

            
            // $('#chart1_filter').appendTo($("#header"));
            // $('#chart1_length').appendTo($("#header"));
            // $('#chart1_info').appendTo($("#footer"));
            // $('#chart1_paginate').appendTo($("#footer"));

            var a = document.getElementsByTagName('a');
            a[a.length - 1].parentElement.remove();
        }
    });
    $('#counter-display').text($('#counter').text());
} );

var views = {
    '':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    'stat':[0,2,3,4,5,6,7,8,9,10,11,12],
    'mel':[0,2,3,4,6,8,12,13,14],
    'sht':[0,2,3,4,7,9,12,13,14],
    'skill':[0,2,3,4,12,13,14],
}

function toggleColumns(type=""){
    table.columns().visible(false);
    table.columns(views[type]).visible(true);
}


function sortOptions(selElem) {
    var tmpAry = new Array();
    for (var i=1;i<selElem.options.length;i++) {
        tmpAry[i-1] = new Array();
        tmpAry[i-1][0] = selElem.options[i].text;
        tmpAry[i-1][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 1) {
        selElem.options[1] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i+1] = op;
    }
    return;
}
