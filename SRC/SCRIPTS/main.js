document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo').value; // CRIAR A VARIÁVEL = N° DO SUBMIT
        numeroMaximo = parseInt(numeroMaximo); // TORNAR A VARIÁVEL UM NÚMERO INTEIRO

        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio + 1); // "Math.ceil(14.18)" ▶ VAI SEMPRE ARREDONDAR PARA CIMA(15) //* "Math.round(14.18)" ▶ ARREDONDA CONFORME REGRA MATEMÁTICA(14)


        document.getElementById('resultado-valor').innerText = numeroAleatorio; // PARA INSERIR TEXTOS
        document.querySelector('.resultado').style.display = 'block'; // PARA APARECER SOMENTE QUANDO CLICA NO BOTÃO (main.less)
    }) 
})