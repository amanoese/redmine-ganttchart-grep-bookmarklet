$(function(){
  var $subject = $('.issue-subject,.version-name');

  var $task    = $('.task');
  var $toolTip = $('.tooltip');
  var $tasks   = $().add($task).add($toolTip);

  $().add($subject).add($tasks).each((i,x)=>{
    $(x).data('h',$(x).position().top);
    $(x).data('l',$(x).position().left);
  });
  var maxWidth = $subject.map((i,x)=>+$(x).data('l')).get().reduce((s,x)=> x >= s ? x : s);
  var minWidth = $subject.map((i,x)=>+$(x).data('l')).get().reduce((s,x)=> x <= s ? x : s);

  $subject.each((i,x)=>{
    $(x).data('task',$tasks.filter((i,f)=> $(f).data('h') == $(x).data('h')));
    $(x).data('tooltip',$toolTip.filter((i,f)=> $(f).data('h') == $(x).data('h')));
    $(x).data('text',$(x).text()+$(x).data('task').text(),$(x).data('task').text());
  }).each((i,x)=>{
    $(x).attr('data-shift','-'.repeat(parseInt((maxWidth - $(x).data('l')) / 22) + 1))
  }).each((i,x)=>{
    $(x).data('$parents',$());
  }).each((i,x)=>{
    let left = $(x).data('l');
    $(x).nextUntil(`[data-shift*="${$(x).data('shift')}"]`,'.issue-subject,.version-name').each((i,c)=>{
      $(c).data('$parents',$(c).data('$parents').add(x));
    });
  });

  var rootTop = $('.project-name').position().top;
  var $input = $('<input>');
  $('#query_form').after($input).after('grep:');
  $input.on('input',function(){
    let text = $(this).val();
    let $view = $subject.filter(function(){
      return text === '' ? true : text.split(' ').filter(x=>x).some(x=>$(this).data('text').match(x));
    });
    $subject.hide();
    $tasks.hide();

    let $viewParents = $view.add($view.map((i,x)=>$(x).data('$parents').get()).css('background-color','#ABF5FF'));
    $viewParents.each((i,x)=>{ $(x).css({top:(i+1)*22 + rootTop}); }).show();
    $viewParents.map((i,x)=>$(x).data('task').css({top:(i+1)*22 + rootTop}).get()).show();
    $view.css('background-color','#FFFFFF')
  });
});
