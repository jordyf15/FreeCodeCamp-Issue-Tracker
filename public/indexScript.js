$('#create-project').on('submit',(e)=>{
    e.preventDefault();//prevent the page from reloading so the jsonResult can be seen
    $.ajax({
        url: '/api/project',
        type: 'post',
        data: $('#create-project').serialize(),
    success: function(data) {
      $('#jsonResult').text(JSON.stringify(data)+' {Created}');
    }
    });
})
$('#delete-project').on('submit',(event)=>{
    event.preventDefault();
    $.ajax({
        url:'/api/project',
        type: 'delete',
        data: $('#delete-project').serialize(),
        success: (data)=>{
            $('#jsonResult').text(JSON.stringify(data)+ ' {Deleted}');
        }
    })
})
$('#submit-issue').on('submit',(event)=>{
    event.preventDefault();
    $.ajax({
        url:'/api/issues/'+$('#project_name_submit').val(),
        type: 'post',
        data: $('#submit-issue').serialize(),
        success: (data)=>{
            $('#jsonResult').text(JSON.stringify(data));
        }
    })
})
$('#update-issue').on('submit',(event)=>{
    event.preventDefault();
    $.ajax({
        url: '/api/issues/'+$('#project_name_update').val(),
        type: 'put',
        data: $('#update-issue').serialize(),
        success: (data)=>{
            $('#jsonResult').text(JSON.stringify(data));
        }
    })
})
$('#delete-issue').on('submit',(event)=>{
    event.preventDefault();
    $.ajax({
        url: '/api/issues/'+$('#project_name_delete').val(),
        type:'delete',
        data: $('#delete-issue').serialize(),
        success: (data)=>{
            $('#jsonResult').text(JSON.stringify(data));
        }
    })
}) 
$('#project-issue').on('submit',(event)=>{
    var url='/'+$('#project_name_view').val();
    var queryCount=0;
    if($('#issue_title_view').val()!=""){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        url+='issue_title='+$('#issue_title_view').val();
        queryCount++;
    }
    if($('#issue_text_view').val()!=""){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+='issue_text='+$('#issue_text_view').val();
    }
    if($('#created_by_view').val()!=""){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+='created_by='+$('#created_by_view').val();
    }
    if($('#assigned_to_view').val()!=""){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+="assigned_to="+$('#assigned_to_view').val();
    }
    if($('#status_text_view').val()!=""){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+="status_text="+$('#status_text_view').val();
    }
    if($('#created_on_from_view').val()!=''){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+="created_on_from="+$('#created_on_from_view').val();
    }
    if($('#created_on_to_view').val()!=''){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+="created_on_to="+$('#created_on_to_view').val();
    }
    if($('#updated_on_from_view').val()!=''){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+="updated_on_from="+$('#updated_on_from_view').val();
    }
    if($('#updated_on_to_view').val()!=''){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+="updated_on_to="+$('#updated_on_to_view').val();
    }
    //open viewnya text aja
    if($('#open_view').val()!=''){
        if(queryCount==0){
            url+='?';
        }else if(queryCount>0){
            url+='&';
        }
        queryCount++;
        url+='open='+$('#open_view').val();
    }
    console.log(url);
    window.location.href=url;
    event.preventDefault();
})
$('#view-projects').on('click',(event)=>{
    window.location.href='/api/projects';
})