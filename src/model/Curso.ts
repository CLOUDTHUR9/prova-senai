
import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um Curso.
 */
export class Curso {

    /* Atributos */

    /**
     * Identificador do Curso.
     */
    private idCurso: number = 0;

    /**
     * Nome do Curso.
     */
    private nome: string;

    /**
     * Especialidade do Curso.
     */
    private duracao: string;

    /**
     * CRM do Curso.
     */
    private modalidade: string;

    /**
     * status do Curso. 
     */
    private statusCurso: boolean = true;

    /**
     * Construtor da classe Curso.
     * 
     * @param nome Nome do Curso.
     * @param duracao Especialidade do Curso.
     * @param modalidade CRM do Curso.
     */
    constructor(
        nome: string,
        duracao: string,
        modalidade: string
    ) {
        this.nome = nome;
        this.duracao = duracao;
        this.modalidade = modalidade;
    }

    /* Métodos get e set */

    /**
     * Recupera o identificador do Curso.
     * @returns O identificador do Curso.
     */
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Define o identificador do Curso.
     * @param idCurso O identificador do Curso.
     */
    public setIdCurso(idCurso: number): void {
        this.idCurso = idCurso;
    }

    /**
     * Recupera o nome do Curso.
     * @returns O nome do Curso.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do Curso.
     * @param nome O nome do Curso.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Recupera a Duracao do Curso.
     * @returns A Duracao do Curso.
     */
    public getDuracao(): string {
        return this.duracao;
    }

    /**
     * Define a Duracao do Curso.
     * @param Duracao A Duracao do Curso.
     */
    public setDuracao(duracao: string): void {
        this.duracao = duracao;
    }

    /**
     * Recupera o modalidade do Curso.
     * @returns O modalidade do Curso.
     */
    public getModalidade(): string {
        return this.modalidade;
    }

    /**
     * Define o modalidade do Curso.
     * @param modalidade O modalidade do Curso.
     */
    public setModalidade(modalidade: string): void {
        this.modalidade = modalidade;
    }

        /**
* Retorna o statusCurso no sistema
* 
* @return status do Medico do sistema 
*/
public getStatusCurso(): boolean {
    return this.statusCurso;
}


/**
 * Atribui um valoro statusCurso do Curso
 * 
 * @param _statusCurso : statusCurso do Curso
 */
public setStatusCurso(statusCurso: boolean) {
    this.statusCurso = statusCurso;
}


    /**
     * Realiza a listagem de médicos no banco de dados.
     * 
     * Esta função consulta a tabela `Curso` e retorna uma lista de objetos do tipo `Curso`. 
     * Se houver um erro durante a consulta, a função retorna `null`.
     * 
     * @returns {Promise<Array<Curso> | null>} - Um array de objetos do tipo `Curso` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     */
    static async listagemCursos(): Promise<Array<Curso> | null> {
        const listaDeCursos: Array<Curso> = [];

        try {
            // Query de consulta ao banco de dados
            const querySelectCurso = `SELECT * FROM curso WHERE status_curso = true;`;

            // Fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectCurso);

            // Usando a resposta para instanciar objetos do tipo Curso
            respostaBD.rows.forEach((linha: any) => {
                const novoCurso = new Curso(
                    linha.nome,
                    linha.duracao,
                    linha.modalidade
                );
                // Atribui o ID ao objeto
                novoCurso.setStatusCurso(linha.status_curso)
                novoCurso.setIdCurso(linha.id_curso);

                // Adiciona o objeto na lista
                listaDeCursos.push(novoCurso);
            });

            // Retorna a lista de Curso
            return listaDeCursos;
        } catch (error) {
            console.log('Erro ao buscar lista de Curso. Verifique os logs para mais detalhes.');
            console.log(error);
            return null;
        }
    }

    /**
     * Cadastra um novo médico no banco de dados.
     * 
     * Esta função recebe um objeto `Curso`, extrai as informações relevantes e realiza uma operação de inserção (INSERT) na tabela `Curso`.
     * Se o cadastro for bem-sucedido, a função retorna `true`, caso contrário, retorna `false`.
     * 
     * @param {Curso} curso - Objeto contendo os dados do médico a ser cadastrado.
     * 
     * @returns {Promise<boolean>} - Retorna `true` se o cadastro foi realizado com sucesso, ou `false` se ocorreu um erro.
     */
    static async cadastroCurso(curso: Curso): Promise<boolean> {
        try {
            // Query para fazer insert de um médico no banco de dados
            const queryInsertCurso = `INSERT INTO curso (nome, duracao, modalidade)
                          VALUES
                          ('${curso.getNome()}', 
                           '${curso.getDuracao()}', 
                           '${curso.getModalidade()}')
                          RETURNING id_curso;`;

            // Executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCurso);

            // Verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Curso cadastrado com sucesso! ID do Curso: ${respostaBD.rows[0].id_curso}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

        } catch (error) {
            // Imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Curso. Verifique os logs para mais detalhes.');
            // Imprime o erro no console
            console.log(error);
            // Retorno um valor falso
            return false;
        }
    }

    
    /**
     * Remove um Curso do banco de dados
     * @param idCurso ID do Curso a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerCurso(id_curso: number): Promise<Boolean> {
        // variável para controle de resultado da consulta (query)
        let queryResult = false;

        try {
            // Cria a consulta (query) para remover o Curso
            const queryDeleteConsultaCurso = `UPDATE matricula 
                                                    SET status_matricula_registro = FALSE
                                                    WHERE id_curso=${id_curso};`;

            // remove os emprestimos associado ao Curso
            await database.query(queryDeleteConsultaCurso);

            // Construção da query SQL para deletar o Curso.
            const queryDeleteCurso = `UPDATE curso 
                                        SET status_curso = FALSE
                                        WHERE id_curso=${id_curso};`;
                                        

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // retorna o resultado da query
            return queryResult;

            // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }


    /**
    * Atualiza os dados de um Curso no banco de dados.
    * @param curso Objeto do tipo Curso com os novos dados
    * @returns true caso sucesso, false caso erro
    */
    static async atualizarCadastroCurso(curso: Curso): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do Curso no banco de dados.
            const queryAtualizarCurso = `UPDATE Curso SET 
                                            nome = '${curso.getNome().toUpperCase()}', 
                                            duracao = '${curso.getDuracao()}',
                                            modalidade = '${curso.getModalidade()}'                                           
                                        WHERE id_curso = ${curso.idCurso}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            console.log(queryAtualizarCurso)
            await database.query(queryAtualizarCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}