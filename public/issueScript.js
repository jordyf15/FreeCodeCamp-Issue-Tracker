$(function() {
    var currentProject = window.location.pathname.replace(/\//g, "");;
    var url = "/api/issues/"+currentProject;
    console.log(currentProject);
    var queryCount=0;
    console.log($('#issueScript').attr('query.issue_title'))
    if($('#issueScript').attr('query.issue_title')){//query issue_title
        if(queryCount==0){
            url+='?';//before adding query we need ?
        }
        url+='issue_title='+$('#issueScript').attr('query.issue_title')
        queryCount++;
    }
    if($('#issueScript').attr('query.issue_text')){//query.issue_text
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='issue_text='+$('#issueScript').attr('query.issue_text');
    }
    if($('#issueScript').attr('query.created_by')){//query.created_by
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='created_by='+$('#issueScript').attr('query.created_by')
    }
    if($('#issueScript').attr('query.assigned_to')){//query.assigned_to
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='assigned_to='+$('#issueScript').attr('query.assigned_to')
    }
    if($('#issueScript').attr('query.status_text')){//query.status_text
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='status_text='+$('#issueScript').attr('query.status_text');
    }
    if($('#issueScript').attr('query.created_on_from')){//query.created_on_from
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='created_on_from='+$('#issueScript').attr('query.created_on_from')
    }
    if($('#issueScript').attr('query.created_on_to')){//query.created_on_to
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='created_on_to='+$('#issueScript').attr('query.created_on_to')
    }
    if($('#issueScript').attr('query.updated_on_from')){//query.updated_on_from
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='updated_on_from='+$('#issueScript').attr('query.updated_on_from')
    }
    if($('#issueScript').attr('query.updated_on_to')){//query.updated_on_to
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='updated_on_to='+$('#issueScript').attr('query.updated_on_to')
    }
    if($('#issueScript').attr('query.open')){//query.open
        if(queryCount==0){
            url+='?'
        }else if(queryCount>0){
            url+='&'
        }
        url+='open='+$('#issueScript').attr('query.open')
    }
    $('#projectTitle').text('All issues for: '+currentProject)
    $.ajax({//getting all of the issue in the project
      type: "GET",
      url: url,
      success: function(data)
      {
          //rendering html elements for each issue
        var issues= [];
        data.forEach(function(ele) {
          var openstatus;
          (ele.open) ? openstatus = 'open' : openstatus = 'closed';
          var single = [
            '<div class="issue '+openstatus+'">',
            '<p class="id">id: '+ele._id+'</p>',
            '<h3>'+ele.issue_title+' -  ('+openstatus+')</h3>',
            '<br>',
            '<p>'+ele.issue_text+'</p>',
            '<p>'+ele.status_text+'</p>',
        
            '<p class="id"><b>Created by:</b> '+ele.created_by+'  <b>Assigned to:</b> '+ele.assigned_to,
            '<p class="id"><b>Created on:</b> '+ele.created_on+'  <b>Last updated:</b> '+ele.updated_on,
            '<br><a href="#" class="closeIssue" id="'+ele._id+'">close?</a> <a href="#" class="deleteIssue" id="'+ele._id+'">delete?</a>',
            '</div>'
            
          ];
          issues.push(single.join(''));
        });
        $('#issueDisplay').html(issues.join(''));
      }
    });
    
    $('#newIssue').submit(function(e){//creating a new issue in the project
      e.preventDefault();
      $(this).attr('action', "/api/issues/" + currentProject);
      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) { window.location.reload(true); }
      });
    });
    
    $('#issueDisplay').on('click','.closeIssue', function(e) {//close the selected issue
      var url = "/api/issues/"+currentProject;
      $.ajax({
        type: "PUT",
        url: url,
        data: {_id: $(this).attr('id'), open: false},
        success: function(data) { alert(data); window.location.reload(true); }
      });
      e.preventDefault();
    });
    $('#issueDisplay').on('click','.deleteIssue', function(e) {//deletes the selected issue
      var url = "/api/issues/"+currentProject;
      console.log($(this).attr('id'));
      $.ajax({
        type: "DELETE",
        url: url,
        data: {issue_id: $(this).attr('id')},
        success: function(data) { 
          alert(data.success); window.location.reload(true); 
        }
      });
      e.preventDefault();
    });
  });