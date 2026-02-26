//Meu codigo para o mini app de banco - Não é um projeto complexo porém exigiu muito conhecimento que eu não tinha - usei o auxilio de IA em muita coisa porém não construi nada sem entender como você tinha dito - tanto é que talvez existam modos mais faceis de fazer o que fiz aqui
//Não tenho a confiança de dizer que consegueria fazer tudo de cabeça mas toda parte do codigo eu entendo e sei onde vai cada coisa

const valor = { 
  saldo: 15000,
  poupanca: 0
};// variavel com dois valores distintos para eu usar mais tarde -> objeto com hashtable interna

const mensagem = document.getElementById("mensagem");//variavel de mensagem para erros - será usada na função
const valor_conta = document.getElementById("valor");//valor_conta é igual ao id do documento html de id "valor"
const valor_poupanca = document.getElementById("poupanca");//mesma coisa porem para a poupança

function saldo() {
  valor_conta.textContent = `R$ ${valor.saldo}`;
  valor_poupanca.textContent = `Valor da Caixinha - R$ ${valor.poupanca}`;
}// função do saldo que faz ele funcionar - valor_conta que é o id "valor" no index.html - property set = texto "R$" + inserir a var valor(saldo = 2000) - substitui o valor de texto pelo novo definido aqui

saldo(); // chama a função saldo
 
// agora preciso criar uma função que atualiza o saldo para subtrair o valor total que foi inserido no input
// ou seja: Pega valor do input
// Subtrai do saldo
// Soma na poupança
// Atualiza tela

const investimento = document.getElementById("investimento");
//investimento vai ser o valor transferido do saldo para a poupança

function mostrarMensagem(texto) {
  mensagem.textContent = texto;

  setTimeout(() => {
    mensagem.textContent = "";
  }, 2000);
}

//função para a mensagem de erro sumir após 2 segundos

function transferir() {
    const numero = Number(investimento.value);
    //transforma o investimento.value (ex."100") que é uma string em um numero (100)

    if (numero > valor.saldo){
        mostrarMensagem("Saldo insuficiente");
        return;
    } //impedir numeros maiores que o saldo atual - se o valor da transferencia for maior q o valor autal do saldo ele impede e avisa

    if (numero <= 0){
        mostrarMensagem("Digite um valor válido");
        return;
    } // impedir numeros negativos - isso iria aumentar o valor do saldo e viraria um emprestimo


    valor.saldo = valor.saldo - numero;
    valor.poupanca = valor.poupanca + numero;
    //conta dos valores -- valor atual igual a valor atua +/- numero


    saldo();//chama a função
}

const botao = document.getElementById("botao_transferencia") //variavel para o botao no html ser alcançavel no js

botao.onclick = transferir;

const aporteInput = document.getElementById("aporte");
const botaoSimular = document.getElementById("simular");
const resultado = document.getElementById("resultado2");//coloquei resultado2 para diferenciar no html
const mensagem2 = document.getElementById("mensagem2");//mesma coisa

function mostrarMensagem2(texto) { //nova função para a mensagem não sair no lugar errado -> mensagem2 vira um novo texto
  mensagem2.textContent = texto;

  setTimeout(() => {
    mensagem2.textContent = "";
  }, 2000);
}

function simular() {
  const aporte = Number(aporteInput.value);//string para numero - nova variavel aporte transforma o aporte input no valor real em numero facilitando muito

  let total = valor.poupanca;//total é a partir do valor da caixinha(1)
  let meses = 0;//contador de meses que começa em zero

  if (aporte <= 0) {
    mostrarMensagem2("Digite um valor válido");
    return;
  }

  while (total < 1000000) {//loop até um milhao de investimentos
    total = (total * 1.01) + aporte;//(1)
    meses++;//(2)
  }
  //valorização de 1% ao mes do CDB -> o valor total é igual da poupança como definimos no numero (1) definimos ele como seu propio valor vezes 1%(1.01) mais(+) o valor do aporte - loop até um milhao (2)
  //contador de meses do loop -> vai somando um mes a cada loop enquanto o valor  do total(2) chegar no limite - ai quebra o while e o codigo funciona

  const totalFinal = Math.floor(total);//arrendondar o valor
  const anos = Math.floor(meses / 12);//floor + dividir pelo numero de meses
  const mesesRestantes = meses % 12;//modulo para obter o valor de meses "sobrando"-> vai resultar em anos + meses(modulo)

  resultado.textContent =
    `Você alcança R$ 1.000.000 em ${meses} meses (${anos} anos e ${mesesRestantes} meses).
     Total acumulado: R$ ${totalFinal}`;//mensagem final
}

botaoSimular.onclick = simular;