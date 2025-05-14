import { DatabaseModel } from "./DatabaseModel";
// Armazena o pool de conexões com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa um Aluno.
 */
export class Aluno {

    /* Atributos */
    /* Identificador do Aluno */
    private idAluno: number = 0;
    /* Nome do Aluno */
    private nome: string;
    /* CPF do Aluno */
    private cpf: string;
    /* Telefone do Aluno */
    private telefone: string;
    /* Email do Aluno */
    private email: string;
    private statusAluno: boolean = true;

    /**
     * Construtor da classe Aluno
     * 
     * @param nome Nome do Aluno
     * @param cpf CPF do Aluno
     * @param telefone Telefone do Aluno
     * @param email Email do Aluno

     */
    constructor(
        nome: string,
        cpf: string,
        telefone: string,
        email: string,

    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;

    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do Aluno
     * @returns O identificador do Aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui um valor ao identificador do Aluno
     * @param idAluno Novo identificador do Aluno
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o nome do Aluno.
     * 
     * @returns {string} O nome do Aluno.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do Aluno.
     * 
     * @param nome O nome do Aluno a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o CPF do Aluno.
     * 
     * @returns {string} O CPF do Aluno.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o CPF do Aluno.
     * 
     * @param cpf O CPF do Aluno.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do Aluno.
     * 
     * @returns {string} O telefone do Aluno.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do Aluno.
     * 
     * @param telefone O telefone do Aluno.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    /**
     * Retorna o email do Aluno.
     * 
     * @returns {string} O email do Aluno.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o email do Aluno.
     * 
     * @param email O email do Aluno.
     */
    public setEmail(email: string): void {
        this.email = email;
    }



    /**
    * Retorna o statusAluno no sistema
    * 
    * @return status do Aluno do sistema 
    */
    public getStatusAluno(): boolean {
        return this.statusAluno;
    }


    /**
     * Atribui um valoro statusAluno do Aluno
     * 
     * @param _statusPaciente : statusAluno do Aluno
     */
    public setStatusAluno(statusAluno: boolean) {
        this.statusAluno = statusAluno;
    }


    /**
     * Busca e retorna uma lista de Aluno do banco de dados.
     * 
     * @returns Um array de objetos do tipo Aluno em caso de sucesso ou null se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "Aluno".
     * - Os dados retornados são utilizados para instanciar objetos da classe Aluno.
     * - Cada Aluno instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna null.
     */
    static async listagemAlunos(): Promise<Array<Aluno> | null> {
        const listagemAlunos: Array<Aluno> = [];

        try {
            const querySelectAluno = 'SELECT * FROM aluno WHERE status_aluno = true;';
            const respostaBD = await database.query(querySelectAluno);

            respostaBD.rows.forEach((linha: any) => {
                const novoAluno = new Aluno(
                    linha.nome,
                    linha.cpf,
                    linha.telefone,
                    linha.email
                );

                novoAluno.setIdAluno(linha.id_aluno);

                listagemAlunos.push(novoAluno);
            });

            return listagemAlunos;
        } catch (error) {
            console.log('Erro ao buscar lista de Aluno');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um Aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo Aluno e insere seus dados (nome, cpf, telefone, email, dataNascimento, endereco)
     * na tabela Aluno do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Aluno} aluno Objeto contendo os dados do Aluno que será cadastrado. O objeto Aluno
     *                        deve conter os métodos getNome(), getCpf(), getTelefone(), getEmail(),
     *                        getDataNascimento() e getEndereco() que retornam os respectivos valores do Aluno.
     * @returns {Promise<boolean>} Retorna true se o Aluno foi cadastrado com sucesso e false caso contrário.
     *                             Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                 no console junto com os detalhes do erro.
     */
    static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // Query para inserir um novo Aluno no banco de dados
            const queryInsertAluno = `INSERT INTO Aluno (nome, cpf, telefone, email)
                                        VALUES
                                        ('${aluno.getNome()}', 
                                        '${aluno.getCpf()}',
                                        '${aluno.getTelefone()}',
                                        '${aluno.getEmail()}')
                                        RETURNING id_aluno;`;

            // Executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertAluno);

            // Verifica se a operação foi bem-sucedida (linha inserida no banco)
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do Aluno: ${respostaBD.rows[0].id_aluno}`);
                return true; // Cadastro realizado com sucesso
            }
            return false; // Cadastro não realizado

        } catch (error) {
            // Exibe uma mensagem de erro no console
            console.log('Erro ao cadastrar o Aluno. Verifique os logs para mais detalhes.');
            console.log(error); // Exibe o erro ocorrido
            return false; // Retorna false indicando falha no cadastro
        }
    }

    /**
     * Remove um Aluno do banco de dados.
     * 
     * A função realiza a desativação do Aluno e suas consultas associadas no banco de dados.
     * 
     * @param id_aluno Identificador único do Aluno a ser removido
     * @returns {Promise<boolean>} Retorna true se a operação foi bem-sucedida, e false em caso de erro.
     */
    static async removerAluno(id_aluno: number): Promise<Boolean> {
        let queryResult = false;

        try {
            // Atualiza o status da Aluno para indicar que o aluno não está mais ativo
            const queryDeleteMatriculaAluno = `UPDATE matricula 
                                                SET status_matricula_registro = FALSE
                                                WHERE id_aluno=${id_aluno};`;

            // Executa a atualização de status das consultas associadas ao Aluno
            await database.query(queryDeleteMatriculaAluno);

            // Atualiza o status do aluno para desativado
            const queryDeleteAluno = `UPDATE aluno 
                                         SET status_aluno = FALSE
                                         WHERE id_aluno=${id_aluno};`;

            // Executa a atualização de status do Aluno
            await database.query(queryDeleteAluno)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Operação bem-sucedida
                    }
                });

            return queryResult; // Retorna o resultado da operação

        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult; // Retorna false em caso de erro
        }
    }

    /**
     * Atualiza os dados de um Aluno no banco de dados.
     * 
     * @param aluno Objeto do tipo Aluno com os novos dados
     * @returns {boolean} Retorna true em caso de sucesso, false em caso de erro
     */
    static async atualizarCadastroAluno(aluno: Aluno): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.

        try {
            // Consulta SQL para atualizar os dados do Aluno
            const queryAtualizarAluno = `UPDATE aluno
                                            SET nome='${aluno.getNome()}',
                                                cpf='${aluno.getCpf()}',
                                                telefone='${aluno.getTelefone()}',
                                                email='${aluno.getEmail()}')
                                            WHERE id_aluno=${aluno.getIdAluno()};`;

            // Executa a consulta de atualização
            await database.query(queryAtualizarAluno)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Operação bem-sucedida
                    }
                });

            return queryResult; // Retorna o resultado da operação

        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult; // Retorna false em caso de erro
        }
    }
}
