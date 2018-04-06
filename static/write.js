const slowStart = (fn, time)=>{
    let tid = 0
    return function() {
        clearTimeout(tid)
        tid = setTimeout(()=>{
            fn()
        }, time)
    }
}

const save = ()=>{
    const titleNode = document.querySelector('.input-title-input')
    const contentNode = document.querySelector('.input-content-input')
    const idNode = document.querySelector('.input-id-input')

    $.ajax({
        url: '/api/save',
        method: 'post',
        data: {
            title: titleNode.value,
            content: contentNode.value,
            id: idNode.value
        },
    }).done(function(){
        
    }).fail(function(){
        console.log('fail')
    })

}

const titleNode = document.querySelector('.input-title-input')
const contentNode = document.querySelector('.input-content-input')
titleNode.addEventListener('input', slowStart(save, 500))
contentNode.addEventListener('input', slowStart(save, 500))