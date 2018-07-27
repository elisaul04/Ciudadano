

function getSectionToDisplay(section) {
    //preventDefault();
    console.log(document.templates);
    let usertmp = document.templates['usuario_temp.tmp'];
    $('#main_container').append(usertmp);
    console.log('user ', usertmp);
  // console.log('import' in document.createElement('link'));
  // event.preventDefault();
}
