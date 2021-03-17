class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
	verificar(){
		let k = 0
		for(let i in this){
			if(this[i] === undefined || this[i] === null || this[i] === ''){ //o for in percorre uma lista ou objetos dando uma variável para cada indice, o this[] é uma outra forma de acessar o valor do atributo, é a mesma coisa do ponto this.
				return false
			}
		}
		return true
	}
}

class BD {
	constructor(){
		let id = localStorage.getItem('id')
		if(id === null){
			localStorage.setItem('id', 0)
		}
	}
	proxId(){
		let proxId = localStorage.getItem('id')
		return parseInt(proxId) +1
	}
	gravar(d){
		let id = this.proxId()
		d.id = id
		localStorage.setItem(id,JSON.stringify(d))
		localStorage.setItem('id', id) 
// JSON é um arquivo string, da pra transformar uma funcao, objeto, lista, qqr coisa em json. com o JSON.strinfigify. o localstorage guarda dados no banco de dados do proprio navegador
	}

	listar(){
		let id = localStorage.getItem('id')
		let lista = Array()
		for(var i = 0; i <= id; i++){
			if(localStorage.getItem(i) === null)
				continue // pula um item da lista
			//lista.id = i
			lista.push(JSON.parse(localStorage.getItem(i)))
		}
		
		return lista
	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let listarDespesas =()=>{
	let despesa = pesquisarDespesas()
	listaD.innerHTML = ''
	if(despesa.length === 0){return}
	despesa.forEach(d=>{
	linha = listaD.insertRow()
	linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
	switch(parseInt(d.tipo)){
		case 1: d.tipo = 'Alimentação'
			break
		case 2: d.tipo = 'Educação'
			break
		case 3: d.tipo = 'Lazer'
			break
		case 4: d.tipo = 'Saúde'
			break	
		case 5: d.tipo = 'Transporte'
			break
	}
	linha.insertCell(1).innerHTML = d.tipo
	linha.insertCell(2).innerHTML = d.descricao
	linha.insertCell(3).innerHTML = d.valor
	let btn = document.createElement('button')
	btn.className = 'btn btn-danger'
	btn.innerHTML = '<i class="fas fa-times"></i>'
	btn.id = d.id
	btn.onclick =()=>{
		new BD().remover(btn.id)
		window.location.reload()
	}
	linha.insertCell(4).append(btn)
	console.log(btn.id)
	})
}

let pesquisarDespesas =()=>{
	d = new Despesa(ano.value,mes.value,dia.value,tipo.value,descricao.value,valor.value)
	var e = new BD().listar()

	if(d.ano != ""){
		e = e.filter(x=>x.ano == d.ano)		
	}
	if(d.mes != ""){
		e = e.filter(x=>x.mes == d.mes)
	}
	if(d.dia != ""){
		e = e.filter(x=>x.dia == d.dia)
	}
	if(d.tipo != ""){
		e = e.filter(x=>x.tipo == d.tipo)
	}
	if(d.descricao != ""){
		e = e.filter(x=>x.descricao == d.descricao)
	}
	if(d.valor != ""){
		e = e.filter(x=>x.valor == d.valor)
	}

	return e
}

let cadastrarDespesa =()=>{
/*teste()*/ 
	let d = new Despesa(ano.value,mes.value,dia.value,tipo.value,descricao.value,valor.value)

	if(d.verificar()){
		new BD().gravar(d)
		aviso('Registro inserido', ' Despesa cadastrada com sucesso!' , 'Voltar', '')
		limpar()				
	}else {
		aviso('Erro na gravação', 'Existem campos obrigatórios que não foram preenchidos!'
 , 'Voltar e corrigir', 'vermelho')
	}
	
}


let limpar =()=>{ano.value = '', mes.value = '', dia.value = '', tipo.value = '', descricao.value = '', valor.value = ''}

let aviso =(titulo, mensagem, botao, cor)=>{
	if(cor === 'vermelho'){
		var h = 'btn btn-danger'
		var i = 'text-danger'
	}else{
		var h = 'btn btn-success'
		var i = 'text-success'
	}
	modalLabel.innerHTML = titulo
	modalLabel.className = i
	caixaMensagem.innerHTML = mensagem
	alerta.innerHTML = botao
	alerta.className = h
	$('#gravacao').modal('show')
}

/*let teste =()=>{console.log(ano.value) // aparentemente n precisa do document.getElementById pra recuperar um valor ???
}*/