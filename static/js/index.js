const head = document.querySelector('.header-head')
const dropdown = document.querySelector('.header-dropdown')

dropdown.classList.add('close')

head.addEventListener('mouseenter', ()=>{
    dropdown.classList.remove('close')
    dropdown.classList.add('open')
})
dropdown.addEventListener('mouseenter', ()=>{
    dropdown.classList.remove('close')
    dropdown.classList.add('open')
})
head.addEventListener('mouseleave', ()=>{
    dropdown.classList.remove('open')
    dropdown.classList.add('close')
})
dropdown.addEventListener('mouseleave', ()=>{
    dropdown.classList.remove('open')
    dropdown.classList.add('close')
})