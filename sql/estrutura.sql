create database dindin;

create table usuarios(
	id serial primary key,
  nome varchar (255) not null,
  email varchar (255) not null unique,
  senha text not null
);

create table categorias(
	id serial primary key,
  descricao varchar (255)
);

create table transacoes(
	id serial primary key,
  descricao varchar (255),
  valor integer not null,
  data timestamp not null default now(),
  categoria_id int not null references categorias(id),
  usuario_id int not null references usuarios(id),
  tipo varchar (255) not null
);