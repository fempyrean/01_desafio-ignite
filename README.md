# 01_desafio-ignite
Desafio 01 do Ignite.

## Sobre o desafio
Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no Node.js!

Essa será uma aplicação para gerenciar tarefas (em inglês *todos*). Será permitida a criação de um usuário com `name` e `username`, bem como fazer o CRUD de *todos*:

- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

Tudo isso para cada usuário em específico (o `username` será passado pelo header). A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

*Utilizei typescript e typeorm (com sqlite) para este desafio, portanto, algumas alterações foram necessárias. Por exemplo, não passo o username no header das requisições, e sim o ID do usuário*

## Routes

**POST** /users
A rota recebe name e username dentro do corpo da requisição. Ao cadastrar um novo usuário, este é armazenado no banco.

**GET** /todos
A rota deve receber, pelo header da requisição, uma propriedade user contendo o id do usuário.
A rota retorna uma lista com todas as tarefas deste usuário.

**POST** /todos
A rota deve receber, pelo header da requisição, uma propriedade user contendo o id do usuário.
A rota deve receber title e deadline dentro do corpo da requisição.
Ao criar um novo **todo**, é criado um registro no banco.
A rota retorna o todo criado

**PUT** /todos/:id
A rota deve receber, pelo header da requisição, uma propriedade user contendo o id do usuário.
A rota deve receber as propriedades title e deadline dentro do corpo da requisição.
O **todo** é atualizado com o que for enviado no corpo da requisição.

**PATCH** /todos/:id/done
A rota deve receber, pelo header da requisição, uma propriedade user contendo o id do usuário.
A **todo** que possuir o :id informado será atualizado para done.

**DELETE** /todos/:id
A rota deve receber, pelo header da requisição, uma propriedade user contendo o id do usuário.
O **todo** que possuir o :id, será removido.
