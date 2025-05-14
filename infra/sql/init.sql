CREATE TABLE matricula (
    id_matricula SERIAL PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_curso INT NOT NULL,
    data_matricula DATE NOT NULL,
    status_matricula_registro BOOLEAN DEFAULT TRUE
	);


INSERT INTO matricula (id_aluno, id_curso, data_matricula, status_matricula_registro)
VALUES 
    (1, 1, '2024-01-20', TRUE),
    (2, 3, '2024-03-05', TRUE),
    (4, 2, '2024-04-18', TRUE);



    CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(100),
    status_aluno BOOLEAN DEFAULT TRUE
);


INSERT INTO aluno (nome, cpf, telefone, email, status_aluno)
VALUES 
    ('Ana Clara Martins', '123.456.789-00', '(11) 91234-5678', 'ana.martins@email.com', TRUE),
    ('Bruno Henrique Silva', '987.654.321-00', '(21) 99876-5432', 'bruno.silva@email.com', FALSE),
    ('Carolina Souza Lima', '456.123.789-00', '(31) 93456-7890', 'carol.lima@email.com', TRUE);




CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    duracao VARCHAR(50) NOT NULL,
    modalidade VARCHAR(50) NOT NULL,
    status_curso BOOLEAN DEFAULT TRUE
);


INSERT INTO curso (nome, duracao, modalidade, status_curso)
VALUES 
    ('Engenharia de Software', '4 anos', 'Presencial', TRUE),
    ('Administração de Empresas', '3 anos', 'EAD', TRUE),
    ('Design Gráfico', '2 anos', 'Híbrido', TRUE);