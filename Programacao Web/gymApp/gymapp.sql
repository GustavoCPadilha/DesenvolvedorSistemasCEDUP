create database if not exists gymapp
default character set utf8
default collate utf8_general_ci;

use gymapp;

create table usuario (
	id_usuario integer unsigned not null auto_increment,
    nome_usuario varchar(45) not null,
	email varchar(45) not null unique,
    senha varchar(30) not null,
    data_nascimento date not null,
    sexo enum('M', 'F'),
    altura float unsigned not null,
    peso_usuario float unsigned not null,
    primary key (id_usuario)
) default charset = utf8;

create table planilhaTreino (
	id_planilhaTreino integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    nome_planilhaTreino varchar(30) unique not null,
    data_inicio date not null,
    ativa_planilhaTreino boolean not null default false,
    primary key (id_planilhaTreino),
    foreign key (id_usuario) references usuario (id_usuario)
) default charset = utf8;

create table exercicio (
	id_exercicio integer unsigned not null auto_increment,
    nome_exercicio varchar(45) not null unique,
    grupo_muscular varchar(30) not null,
    descricao_exercicio text,
    primary key (id_exercicio)
) default charset = utf8;

create table treino (
	id_treino integer unsigned not null auto_increment,
    id_planilhaTreino integer unsigned,
    id_exercicio integer unsigned,
    series integer unsigned not null,
    repeticoes_treino integer unsigned not null,
    carga_treino float unsigned,
    primary key (id_treino),
    foreign key (id_planilhaTreino) references planilhaTreino (id_planilhaTreino),
    foreign key (id_exercicio) references exercicio (id_exercicio)
) default charset = utf8;

create table progressoCarga (
	id_progressoCarga integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    id_exercicio integer unsigned,
    dia_progressoCarga date not null,
    repeticoes_progressoCarga integer unsigned not null,
    carga_progressoCarga float not null,
    primary key (id_progressoCarga),
    foreign key (id_usuario) references usuario (id_usuario),
    foreign key (id_exercicio) references exercicio (id_exercicio)
) default charset = utf8;

create table pesoCorporal (
	id_pesoCorporal integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    dia_pesoCorporal date not null,
    peso_pesoCorporal float unsigned not null,
    meta_peso float unsigned,
    primary key (id_pesoCorporal),
    foreign key (id_usuario) references usuario (id_usuario)
) default charset = utf8;

create table medidaCorporal (
	id_medidaCorporal integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    dia_medidaCorporal date not null,
    regiao_medidaCorporal varchar(20) not null,
    medida_cm float unsigned not null,
    primary key (id_medidaCorporal),
    foreign key (id_usuario) references usuario (id_usuario)
) default charset = utf8;

create table refeicao (
	id_refeicao integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    dia_refeicao date not null,
    descricao_refeicao text not null,
    primary key (id_refeicao),
    foreign key (id_usuario) references usuario (id_usuario)
) default charset = utf8;

create table alimento (
	id_alimento integer unsigned not null auto_increment,
    nome_alimento varchar(45) not null unique,
    calorias_alimento float unsigned not null,
    proteinas_alimento float unsigned not null,
    carboidratos_alimento float unsigned not null,
    gorduras_alimento float unsigned not null,
    primary key (id_alimento)
) default charset = utf8;

create table refeicaoAlimento (
	id_refeicaoAlimento integer unsigned not null auto_increment,
    id_refeicao integer unsigned,
    id_alimento integer unsigned,
    qtde_gramas float unsigned not null,
    primary key (id_refeicaoAlimento),
    foreign key (id_refeicao) references refeicao (id_refeicao),
    foreign key (id_alimento) references alimento (id_alimento)
) default charset = utf8;

create table caloriasDiarias (
	id_caloriasDiarias integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    data_caloriasDiarias date not null,
    caloriais_totais float unsigned,
    proteinas_caloriasDiarias float unsigned,
    carboidratos_caloriasDiarias float unsigned,
    gorduras_caloriasDiarias float unsigned,    
    primary key (id_caloriasDiarias),
    foreign key (id_usuario) references usuario (id_usuario)
) default charset = utf8;

create table passos (
	id_passos integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    dia_passos date not null,
    qtde_metros float unsigned,
    primary key (id_passos),
    foreign key (id_usuario) references usuario (id_usuario)
) default charset = utf8;

create table historicoTreino (
	id_historicoTreino integer unsigned not null auto_increment,
    id_usuario integer unsigned,
    id_exercicio integer unsigned,
    dia_historicoTreino date not null,
    series_feitas integer unsigned not null,
    repeticoes_feitas integer unsigned not null,
    carga_utilizada float unsigned,
    primary key (id_historicoTreino),
    foreign key (id_usuario) references usuario (id_usuario),
    foreign key (id_exercicio) references exercicio (id_exercicio)
) default charset = utf8;

INSERT INTO alimento (nome_alimento, calorias_alimento, proteinas_alimento, carboidratos_alimento, gorduras_alimento) 
VALUES
('Arroz branco', 130.0, 2.7, 28.0, 0.3),
('Feijão carioca', 70.0, 4.5, 12.0, 0.5),
('Frango grelhado', 165.0, 31.0, 0.0, 3.6),
('Salada de alface', 15.0, 1.0, 3.0, 0.1),
('Maçã', 52.0, 0.3, 14.0, 0.2),
('Banana', 89.0, 1.1, 23.0, 0.3),
('Queijo mussarela', 280.0, 18.0, 1.0, 22.0),
('Ovo cozido', 78.0, 6.3, 0.6, 5.3),
('Pão integral', 69.0, 3.6, 12.0, 1.1),
('Iogurte natural', 59.0, 3.5, 7.0, 1.5);

INSERT INTO usuario (nome_usuario, email, senha, data_nascimento, sexo, altura, peso_usuario)
VALUES
('João Silva', 'joao.silva@example.com', 'senha123', '1990-05-15', 'M', 1.75, 70.0),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha456', '1985-08-20', 'F', 1.65, 60.0),
('Pedro Souza', 'pedro.souza@example.com', 'senha789', '2000-01-30', 'M', 1.80, 80.0),
('Ana Costa', 'ana.costa@example.com', 'senha101', '1992-03-22', 'F', 1.70, 55.0),
('Carlos Pereira', 'carlos.pereira@example.com', 'senha112', '1988-11-10', 'M', 1.85, 90.0),
('Juliana Lima', 'juliana.lima@example.com', 'senha131', '1995-07-25', 'F', 1.68, 65.0);

INSERT INTO exercicio (nome_exercicio, grupo_muscular, descricao_exercicio)
VALUES
('Supino reto', 'Peito', 'Exercício realizado deitado, levantando uma barra reta com pesos sobre o peito, trabalhando o músculo peitoral.'),
('Agachamento', 'Pernas', 'Exercício que foca no fortalecimento das coxas e glúteos, onde o indivíduo flexiona os joelhos e quadris para abaixar o corpo e depois retorna à posição inicial.'),
('Puxada na frente', 'Costas', 'Exercício realizado em máquina, puxando uma barra na frente do corpo para trabalhar os músculos das costas, principalmente o latíssimo do dorso.'),
('Cadeira extensora', 'Pernas', 'Exercício isolado para os quadríceps, realizado sentado em uma máquina que estende as pernas.'),
('Rosca direta', 'Bíceps', 'Exercício que foca nos músculos do bíceps, realizado com barra ou halteres, fazendo a flexão do cotovelo.'),
('Desenvolvimento militar', 'Ombros', 'Exercício realizado com barra ou halteres, onde os braços são estendidos acima da cabeça, trabalhando o músculo deltoide.'),
('Flexão de braço', 'Peito', 'Exercício de peso corporal que trabalha os músculos do peito e tríceps, realizando o movimento de empurrar o corpo para cima a partir da posição de prancha.'),
('Abdominal crunch', 'Abdômen', 'Exercício abdominal que foca no músculo reto abdominal, realizando o movimento de flexão do tronco enquanto deitado.'),
('Leg press', 'Pernas', 'Exercício realizado na máquina de leg press, onde o usuário empurra uma plataforma com os pés, fortalecendo quadríceps, glúteos e panturrilhas.'),
('Remada curvada', 'Costas', 'Exercício realizado com barra ou halteres, onde o usuário puxa o peso para o corpo enquanto se mantém com o tronco inclinado para frente, trabalhando os músculos das costas.');

describe planilhatreino;

INSERT INTO planilhatreino (nome_planilhaTreino, data_inicio, ativa_planilhaTreino) 
VALUES
('Treino com foco em pernas', '2024-06-20', true);

select * from planilhatreino;