## Descrição

Aplicativo de fastfood criado para entrega do fastchallenge fase 5.

```bash
NOME : Mateus de Sousa Amaral
RM : 349026
Grupo: 74
```

## Instalação
É necessário possuir o Docker instalado e configurado na estação. No projeto a versão 24.0.2 está sendo utilizada.

## Subindo a aplicação
```bash
docker compose -f "docker-compose.yml" up -d --build
```

O sevidor está acessível na porta 3000 como padrão.

```bash
curl localhost:3000
```
## API

### Orders
<table>
<tr>
<td> Método </td> <td> EndPoint </td> <td> Descrição </td> <td> Solicitação </td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/orders/id </b> </td>
<td> <b>Retorna o pedido correspondente ao ID</b> </td>
<td>

```bash
curl localhost:3000/localhost:3000/orders/1
```

</td>
</tr>
<tr>
<td> <b>GET</b> </td>
<td> <b>/orders/payment/id </b> </td>
<td> <b>Retorna status do pagamento na API Mercado Pago</b> </td>
<td>

```bash
curl localhost:3000/user/payment/1
```

</td>
</tr>

<tr>
<td> <b>GET</b> </td>
<td> <b>/orders </b> </td>
<td> <b>Retorna a lista de pedidos com seus produtos correspondentes</b> </td>
<td>

```bash
curl localhost:3000/user/orders
```

</td>
</tr>

<tr>
<td> <b>GET</b> </td>
<td> <b>/orders/all </b> </td>
<td> <b>Retrona a lista de pedidos apenas</b> </td>
<td>

```bash
curl localhost:3000/user/orders/all
```

</td>
</tr>

<tr>
<td> <b>PATCH</b> </td>
<td> <b>/orders </b> </td>
<td> <b>Atualiza os dados de um pedido (STATUS)</b> </td>
<td>

```json
json
{
    "id": "",
    "status": "Recebido",
    "user_id": "1234567",
    "products": [
        {
            "product_id": 1,
            "quantity": 1
        },
        {
            "product_id": 2,
            "quantity": 1
        }
    ]
}
```

</td>
</tr>

<tr>
<td> <b>POST</b> </td>
<td> <b>/orders </b> </td>
<td> <b>Cria um novo pedido</b> </td>
<td>

```json
json
{
    "status": "Em Preparação",
    "user_id": "1234567",
    "id": 1
}
```

</td>
</tr>
</table>

## Mais informações

### Escolha do padrão SAGA
Na fase 5 o padrão SAGA escolhido foi o de coreografia, pela complexidade baixa das conexões entre serviço de pagamento e serviço de pedidos entendi que um orquestrador não seria necessário. A implementação foi feita utilizando o serviço da GClud Pub/Sub integrando a API de pagamento com Cloud Functions, essa integração também permite configurações de tentativas e outros parametros que diminuem o esforço de desenvolvimento de medidas compensatórias

### Relatório OWASP
O relatório de vulnerabilidades gerado na aplicação OWASP ZAP está contido na pasta ./Docs deste repositório. As APIS product e order representam os fluxos requisitados na descrição do techchallenge. A gestão de pagamentos está implemendada em filas e serverless functions.

### Relatório RIPD 
O relatório RIPD criado a partir do modelo fornecido pelo professor  está contido na pasta ./Docs deste repositório

## Desenho da arquitetura
Os diagramas estão na pasta ./Docs deste repositório

## Vídeo no you tube
Inserir link

A documentação original do event storm está disponível no [Miro](https://miro.com/app/board/uXjVM93c4vE=/)

Além disso no repositório está disponível a pasta [/docs](https://github.com/Dovakjr/tc-microservice-order/tree/master/docs) que contem diagramas e rascunhos usados para criação do projeto.

A estrutura geral do repositório segue o padrão da Clean Architecture implementando o framework [nestJS](https://nestjs.com/) na camada de infraestrutura. 

Abaixo detalhamento do projeto:

```code
├──docs - Documentação e diagramas
├──src 
│  ├── application/use-cases       #Camada que contém funcionalidades da aplicação isoladas por caso de uso
│  ├── Domain                      #Camada que define entidades e interfaces da aplicação
│  ├── Infrastructure              #Camada que possui detalhes de implementação das interfaces (Nest.js, HTTP, Sequelize)
│  ├── Presentations               #Cama que possui detalhes de interfaces para interação com a API (controllers & DTO)
│  └── .       
└── ...     
```