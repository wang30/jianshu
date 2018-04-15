window.onload = function() {
    const showTip = (msg) => {
        const tip = document.querySelector('.error-tip')
        tip.innerText = msg
        tip.style.display = 'block';
        setTimeout(function(){
            tip.style.display = 'none'
        }, 1000)
    }
    
    const submit = document.querySelector('.signIn-submit')
    
    submit.addEventListener('click', (e)=>{
        e.preventDefault();
    
        const email = document.querySelector('input[name=email]').value
        const password = document.querySelector('input[name=password]').value
    
        let info = {
            email: email,
            password: password
        }
    
        $.ajax({
            url: '/api/sign_in',
            type: 'post',
            data: info,
            success: function(data){
                if(data.code === 0) {
                    location.href = '/'
                }
                else {
                    showTip(data.msg)
                }
            }
        })
    })
}