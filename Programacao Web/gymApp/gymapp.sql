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

insert into usuario (nome_usuario, email, senha, data_nascimento, sexo, altura, peso_usuario) values
('Lucas Silva', 'lucas.silva@email.com', 'senha123', '1990-05-15', 'M', 1.75, 72.5),
('Mariana Costa', 'mariana.costa@email.com', 'senha456', '1988-08-23', 'F', 1.62, 60.0),
('Pedro Almeida', 'pedro.almeida@email.com', 'senha789', '1995-02-10', 'M', 1.80, 80.0),
('Ana Paula', 'ana.paula@email.com', 'senha321', '1992-11-30', 'F', 1.68, 58.5),
('Rafael Souza', 'rafael.souza@email.com', 'senha654', '1985-07-05', 'M', 1.77, 85.0),
('Julia Fernandes', 'julia.fernandes@email.com', 'senha987', '1998-04-20', 'F', 1.65, 62.3),
('Bruno Lima', 'bruno.lima@email.com', 'senhaabc', '1991-09-14', 'M', 1.82, 78.0),
('Carla Dias', 'carla.dias@email.com', 'senhadef', '1993-12-02', 'F', 1.70, 65.4),
('Thiago Rocha', 'thiago.rocha@email.com', 'senhageg', '1989-01-17', 'M', 1.76, 73.8),
('Fernanda Martins', 'fernanda.martins@email.com', 'senhaijk', '1996-06-25', 'F', 1.63, 59.9);

insert into planilhaTreino (id_usuario, nome_planilhaTreino, data_inicio, ativa_planilhaTreino) values
(1, 'Treino Força', '2025-01-01', true),
(2, 'Treino Resistência', '2025-02-01', true),
(3, 'Treino Hipertrofia', '2025-03-01', false),
(4, 'Treino Funcional', '2025-01-15', true),
(5, 'Treino Crossfit', '2025-02-10', false),
(6, 'Treino Emagrecimento', '2025-03-05', true),
(7, 'Treino Cardio', '2025-01-20', true),
(8, 'Treino Força e Resistência', '2025-02-15', false),
(9, 'Treino Alongamento', '2025-03-10', true),
(10, 'Treino Full Body', '2025-01-25', true);

insert into exercicio (nome_exercicio, grupo_muscular, descricao_exercicio) values
('Supino Reto', 'Peito', 'Exercício para fortalecer os músculos peitorais.'),
('Agachamento Livre', 'Pernas', 'Exercício que trabalha quadríceps, glúteos e posterior de coxa.'),
('Puxada na Barra Fixa', 'Costas', 'Fortalece dorsais e bíceps.'),
('Rosca Direta', 'Bíceps', 'Focado em fortalecer o bíceps braquial.'),
('Elevação Lateral', 'Ombros', 'Desenvolve os músculos deltoides laterais.'),
('Leg Press', 'Pernas', 'Trabalha quadríceps e glúteos.'),
('Tríceps Pulley', 'Tríceps', 'Exercício para desenvolvimento do tríceps.'),
('Abdominal Supra', 'Abdômen', 'Focado na musculatura abdominal superior.'),
('Remada Curvada', 'Costas', 'Fortalece os músculos das costas.'),
('Stiff', 'Posterior de Coxa', 'Trabalha os isquiotibiais e glúteos.');

insert into treino (id_planilhaTreino, id_exercicio, series, repeticoes_treino, carga_treino) values
(1, 1, 4, 8, 60.0),
(1, 4, 3, 10, 25.0),
(2, 2, 5, 12, 80.0),
(3, 3, 4, 6, 0.0),
(4, 8, 3, 20, 0.0),
(5, 6, 4, 10, 120.0),
(6, 7, 3, 12, 30.0),
(7, 9, 3, 8, 40.0),
(8, 5, 4, 15, 15.0),
(9, 10, 3, 10, 70.0);

insert into progressoCarga (id_usuario, id_exercicio, dia_progressoCarga, repeticoes_progressoCarga, carga_progressoCarga) values
(1, 1, '2025-06-01', 8, 60.0),
(1, 4, '2025-06-01', 10, 25.0),
(2, 2, '2025-06-05', 12, 85.0),
(3, 3, '2025-06-07', 6, 0.0),
(4, 8, '2025-06-10', 20, 0.0),
(5, 6, '2025-06-12', 10, 125.0),
(6, 7, '2025-06-15', 12, 30.0),
(7, 9, '2025-06-18', 8, 45.0),
(8, 5, '2025-06-20', 15, 20.0),
(9, 10, '2025-06-22', 10, 70.0);

insert into pesoCorporal (id_usuario, dia_pesoCorporal, peso_pesoCorporal, meta_peso) values
(1, '2025-06-01', 72.5, 70.0),
(2, '2025-06-02', 60.0, 58.0),
(3, '2025-06-03', 80.0, 78.0),
(4, '2025-06-04', 58.5, 55.0),
(5, '2025-06-05', 85.0, 82.0),
(6, '2025-06-06', 62.3, 60.0),
(7, '2025-06-07', 78.0, 75.0),
(8, '2025-06-08', 65.4, 63.0),
(9, '2025-06-09', 73.8, 70.0),
(10, '2025-06-10', 59.9, 57.0);

insert into medidaCorporal (id_usuario, dia_medidaCorporal, regiao_medidaCorporal, medida_cm) values
(1, '2025-06-01', 'Braço', 32.0),
(2, '2025-06-02', 'Cintura', 75.0),
(3, '2025-06-03', 'Quadril', 95.0),
(4, '2025-06-04', 'Peito', 90.0),
(5, '2025-06-05', 'Panturrilha', 38.0),
(6, '2025-06-06', 'Pescoço', 38.0),
(7, '2025-06-07', 'Braço', 34.0),
(8, '2025-06-08', 'Cintura', 70.0),
(9, '2025-06-09', 'Quadril', 98.0),
(10, '2025-06-10', 'Peito', 88.0);

insert into refeicao (id_usuario, dia_refeicao, descricao_refeicao) values
(1, '2025-06-01', 'Café da manhã: ovos mexidos e pão integral'),
(2, '2025-06-01', 'Almoço: arroz, feijão, frango grelhado e salada'),
(3, '2025-06-01', 'Lanche da tarde: iogurte com frutas'),
(4, '2025-06-01', 'Jantar: peixe assado com legumes'),
(5, '2025-06-01', 'Café da manhã: smoothie de banana e aveia'),
(6, '2025-06-01', 'Almoço: salada Caesar com frango'),
(7, '2025-06-01', 'Lanche da tarde: mix de castanhas'),
(8, '2025-06-01', 'Jantar: omelete com espinafre'),
(9, '2025-06-01', 'Café da manhã: tapioca com queijo branco'),
(10, '2025-06-01', 'Almoço: macarrão integral com molho de tomate');

insert into alimento (nome_alimento, calorias_alimento, proteinas_alimento, carboidratos_alimento, gorduras_alimento) values
('Ovo', 68, 6.0, 1.0, 5.0),
('Peito de Frango', 165, 31.0, 0.0, 3.6),
('Arroz Integral', 110, 2.6, 23.0, 0.9),
('Feijão', 127, 9.0, 22.0, 0.5),
('Banana', 89, 1.1, 23.0, 0.3),
('Iogurte Natural', 59, 10.0, 3.6, 0.4),
('Castanhas', 200, 5.0, 6.0, 18.0),
('Peixe', 120, 22.0, 0.0, 4.0),
('Aveia', 68, 2.4, 12.0, 1.4),
('Queijo Branco', 70, 7.0, 1.0, 5.0);

insert into refeicaoAlimento (id_refeicao, id_alimento, qtde_gramas) values
(1, 1, 100),
(1, 10, 50),
(2, 3, 150),
(2, 4, 100),
(2, 2, 200),
(3, 6, 120),
(4, 8, 180),
(5, 5, 130),
(6, 7, 50),
(7, 9, 80);

insert into caloriasDiarias (id_usuario, data_caloriasDiarias, caloriais_totais, proteinas_caloriasDiarias, carboidratos_caloriasDiarias, gorduras_caloriasDiarias) values
(1, '2025-06-01', 2200, 150, 250, 60),
(2, '2025-06-01', 1800, 120, 200, 50),
(3, '2025-06-01', 2500, 160, 300, 70),
(4, '2025-06-01', 1700, 110, 180, 45),
(5, '2025-06-01', 2300, 140, 260, 65),
(6, '2025-06-01', 2000, 130, 220, 55),
(7, '2025-06-01', 2100, 145, 230, 58),
(8, '2025-06-01', 1900, 125, 210, 52),
(9, '2025-06-01', 2400, 155, 270, 62),
(10, '2025-06-01', 1750, 115, 190, 48);

insert into passos (id_usuario, dia_passos, qtde_metros) values
(1, '2025-06-01', 5000),
(2, '2025-06-01', 6000),
(3, '2025-06-01', 4500),
(4, '2025-06-01', 7000),
(5, '2025-06-01', 8000),
(6, '2025-06-01', 5500),
(7, '2025-06-01', 4800),
(8, '2025-06-01', 7500),
(9, '2025-06-01', 6200),
(10, '2025-06-01', 5300);

insert into historicoTreino (id_usuario, id_exercicio, dia_historicoTreino, series_feitas, repeticoes_feitas, carga_utilizada) values
(1, 1, '2025-06-01', 4, 8, 60.0),
(1, 4, '2025-06-01', 3, 10, 25.0),
(2, 2, '2025-06-02', 5, 12, 80.0),
(3, 3, '2025-06-03', 4, 6, 0.0),
(4, 8, '2025-06-04', 3, 20, 0.0),
(5, 6, '2025-06-05', 4, 10, 120.0),
(6, 7, '2025-06-06', 3, 12, 30.0),
(7, 9, '2025-06-07', 3, 8, 40.0),
(8, 5, '2025-06-08', 4, 15, 15.0),
(9, 10, '2025-06-09', 3, 10, 70.0);
