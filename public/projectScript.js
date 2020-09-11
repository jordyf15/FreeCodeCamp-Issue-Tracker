$.ajax({//get all list of project
    url: '/api/project',
    type:'get',
    success: (data)=>{
        var projects=['<h1>List of All Projects: </h1>'];
        data.forEach(element => {
            var projectEle=[
                '<div class="project" id='+element.projectName+'>',
                '<br>',
                '<p>Project Name: '+element.projectName+'</p>',
                '<br>',
                '<p>Project Id: '+element._id+'</p>',
                '<br>',
                '<button class="view-issues" id="'+element.projectName+'">View Issues</button>',
                '</div>'
            ];
                projects.push(projectEle.join(''));
        });
        $('#projectDisplay').html(projects.join(''));
    }
})
$('#projectDisplay').on('click','.view-issues', function(event) {//redirect to view issue of the selected project
    console.log($(this).attr('id'));
    var url='/'+$(this).attr('id');
    window.location.href=url;
    event.preventDefault();
})