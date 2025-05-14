import { DatabaseModel } from "./DatabaseModel";

// Armazena o pool de conexões com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa uma Matricula.
 */
export class Matricula {

    /* Atributos */

    /**
     * Identificador da Matricula.
     */
    private idMatricula: number = 0;

    /**
     * Nome do paciente da Matricula.
     */
    private idAluno: number;

    /**
    * Nome do paciente da Matricula.
    */
    private idCurso: number;

    /**
     * Data da Matricula.
     */
    private dataMatricula: Date;


    private statusMatriculaRegistro: boolean = true;
    /**
     * Construtor da classe Matricula.
     * 
     * @param idAluno Nome do paciente.
     * @param idCurso Data da Matricula.
     * @param dataMatricula Hora da Matricula.
     */
    constructor(
        idAluno: number,
        idCurso: number,
        dataMatricula: Date,
    ) {
        this.idAluno = idAluno;
        this.idCurso = idCurso;
        this.dataMatricula = dataMatricula;
    }
    /**
     * Recupera o nome do paciente.
     * @returns O nome do paciente.
     */
    public getIdMatricula(): number {
        return this.idMatricula;
    }

    /**
     * Define o nome do paciente.
     * @param nome O nome do paciente.
     */
    public setIdMatricula(idMatricula: number): void {
        this.idMatricula = idMatricula;
    }


/**
 * Recupera o identificador da Matricula.
 * @returns O identificador da Matricula.
 */
public getIdAluno(): number {
    return this.idAluno;
}

/**
 * Define o identificador da Matricula.
 * @param idAluno O identificador da Matricula.
 */
public setIdAluno(idAluno: number): void {
    this.idAluno = idAluno;
}

    /* Métodos get e set */

    /**
     * Recupera o identificador da Matricula.
     * @returns O identificador da Matricula.
     */
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Define o identificador da Curso.
     * @param idCurso O identificador da Curso.
     */
    public setIdCurso(idCurso: number): void {
        this.idCurso = idCurso;
    }


    

    /**
* Recupera o identificador da Matricula.
* @returns O identificador da Matricula.
*/
    public getDataMatricula(): Date {
        return this.dataMatricula;
    }

    /**
     * Define o identificador da Matricula.
     * @param idDataMatricula O identificador da Matricula.
     */
    public setDataMatricula(dataMatricula: Date): void {
        this.dataMatricula = dataMatricula;
    }

    /**
* Retorna o statusMatriculaRegistro no sistema
* 
* @return status do Matricula do sistema 
*/
    public getStatusMatriculaRegistro(): boolean {
        return this.statusMatriculaRegistro;
    }


    /**
     * Atribui um valoro statusMatriculaRegistro do Matricula
     * 
     * @param _statusMatriculaRegistro : statusMatriculaRegistro do Matricula
     */
    public setStatusMatriculaRegistro(statusMatriculaRegistro: boolean) {
        this.statusMatriculaRegistro = statusMatriculaRegistro;
    }



    /**
    * Busca e retorna uma lista de Matricula do banco de dados.
    * @returns Um array de objetos do tipo `Matricula` em caso de sucesso ou `null` se ocorrer um erro durante a Matricula.
    * 
    * - A função realiza uma Matricula SQL para obter todas as informações da tabela "Matricula".
    * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Matricula`.
    * - Cada Matricula é adicionado a uma lista que será retornada ao final da execução.
    * - Se houver falha na Matricula ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
    */
    static async listagemMatriculas(): Promise<Array<Matricula> | null> {
        // objeto para armazenar a lista de Matricula
        const listaDeMatriculas: Array<Matricula> = [];

        try {
            // query de Matricula ao banco de dados
            const querySelectMatricula = `SELECT * FROM matricula;`;

            // fazendo a Matricula e guardando a resposta
            const respostaBD = await database.query(querySelectMatricula);

            // usando a resposta para instanciar um objeto do tipo Matricula
            respostaBD.rows.forEach((linha: any) => {
                // instancia (cria) objeto Matricula
                const novoMatricula = new Matricula(
                    linha.idAluno,
                    linha.idCurso,
                    linha.dataMatricula
                );

                // atribui o ID objeto
                novoMatricula.setIdMatricula(linha.id_matricula);
                novoMatricula.setIdAluno(linha.id_aluno);
                novoMatricula.setIdCurso(linha.id_curso);
                novoMatricula.setDataMatricula(linha.data_matricula);

                // adiciona o objeto na lista
                listaDeMatriculas.push(novoMatricula);

                console.log(novoMatricula)
            });

            // retorna a lista de Matricula
            return listaDeMatriculas;
        } catch (error) {
            console.log('Erro ao buscar lista de Matricula');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um Matricula no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Matricula` e insere seus dados (marca, modelo, ano e cor)
     * na tabela `Matricula` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Matricula} matricula - Objeto contendo os dados do Matricula que será cadastrado. O objeto `Matricula`
     *                        deve conter os métodos `getMarca()`, `getModelo()`, `getAno()` e `getCor()`
     *                        que retornam os respectivos valores do Matricula.
     * @returns {Promise<boolean>} - Retorna `true` se o Matricula foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroMatricula(matricula: Matricula): Promise<boolean> {
        try {
            // query para fazer insert de um Matricula no banco de dados
            const queryInsertMatricula = `INSERT INTO Matricula (id_aluno, id_curso, data_matricula)
                                        VALUES ( 
                                            '${matricula.getIdAluno()}', 
                                            '${matricula.getIdCurso()}', 
                                            '${matricula.getDataMatricula()}')
                                               RETURNING id_matricula;`;

            console.log(queryInsertMatricula);

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertMatricula);

            console.log(respostaBD)

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Matricula cadastrado com sucesso! ID da Matricula: ${respostaBD.rows[0].id_matricula}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Matricula. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    /**
         * Remove um Matricula do banco de dados.
         * 
         * A função realiza a desativação do Matricula e suas Matricula associadas no banco de dados.
         * 
         * @param id_matricula Identificador único do Matricula a ser removido
         * @returns {Promise<boolean>} Retorna true se a operação foi bem-sucedida, e false em caso de erro.
         */
    static async removerMatricula(id_matricula: number): Promise<Boolean> {
        let queryResult = false;

        try {
            // Atualiza o status da matricula para indicar que o matricula não está mais ativo
            const queryDeleteMatricula = `UPDATE matricula 
                                                    SET status_matricula_registro = FALSE
                                                    WHERE id_matricula=${id_matricula};`;

            // Executa a atualização de status do Matricula
            await database.query(queryDeleteMatricula)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Operação bem-sucedida
                    }
                });

            return queryResult; // Retorna o resultado da operação

        } catch (error) {
            console.log(`Erro na Matricula: ${error}`);
            return queryResult; // Retorna false em caso de erro
        }
    }

    /**
     * Atualiza os dados de um Matricula no banco de dados.
     * 
     * @param matricula Objeto do tipo Matricula com os novos dados
     * @returns {boolean} Retorna true em caso de sucesso, false em caso de erro
     */
    static async atualizarCadastroMatricula(matricula: Matricula): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.

        try {
            // matricula SQL para atualizar os dados do paciente
            const queryAtualizarMatricula = `UPDATE matricula
                                                SET id_aluno='${matricula.getIdAluno()}',
                                                    id-curso='${matricula.getIdCurso()}',
                                                    data_matricula='${matricula.getDataMatricula()}')                                                                                                   
                                                WHERE id_matricula=${matricula.idMatricula};`;

            // Executa a matricula de atualização
            console.log(queryAtualizarMatricula);
            await database.query(queryAtualizarMatricula)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Operação bem-sucedida
                    }
                });

            return queryResult; // Retorna o resultado da operação

        } catch (error) {
            console.log(`Erro na Matricula: ${error}`);
            return queryResult; // Retorna false em caso de erro
        }
    }
}