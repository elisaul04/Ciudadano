

function getSectionToDisplay(section) {
    let usertmp;
    $('#main_container').html('<div></div>')
    switch(section) {
        case 'crear_caso':
          usertmp = document.templates['crear_caso.tmp'];
        break;
       
        case 'lista_casos':
          usertmp = document.templates['lista_casos.tmp'];
        break;
        default:
        break;
    }
    console.log(usertmp);
  
    $('#main_container').append(usertmp);
}
