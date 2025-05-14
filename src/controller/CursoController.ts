import { Request, Response } from "express";
import { Curso } from "../model/Curso";

interface CursoDTO {
    nome: string,
    duracao: string,
    modalidade: string,
    statusCurso: string
}

/**
 * A classe CursoController é responsável por controlar as requisições relacionadas aos Curso.
 * 
 * - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "Curso".
 */
export class CursoController {

    /**
     * Lista todos os Cursos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de Cursos em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Curso.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeCursos = await Curso.listagemCursos();
            return res.status(200).json(listaDeCursos);
        } catch (error) {
            console.log('Erro ao acessar listagem de Cursos:', error);
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Curso" });
        }
    }

    /**
     * Cadastra um novo Curso.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao cadastrar o Curso.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface CursoDTO
            const CursoRecebido: CursoDTO = req.body;

            // Instanciando um objeto do tipo Curso com as informações recebidas
            const novoCurso = new Curso(
                CursoRecebido.nome,
                CursoRecebido.duracao,
                CursoRecebido.modalidade
            );
            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Curso.cadastroCurso(novoCurso);

            // Verifica a resposta da função
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Curso cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o Curso. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao cadastrar um Curso:', error);

            // Retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Curso. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idCurso = parseInt(req.params.idCurso);
            const result = await Curso.removerCurso(idCurso);
            
            if (result) {
                return res.status(200).json('Curso removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar o Curso');
            }
        } catch (error) {
            console.log("Erro ao remover o Curso");
            console.log(error);
            return res.status(500).send("error");
        }
    }


    static async atualizar(req: Request, res: Response): Promise<any> {
        console.log("CHEGREI BRASIL")
        try {
            // Desestruturando objeto recebido pelo front-end
            const CursoRecebido: CursoDTO = req.body;
            
            // Instanciando objeto Curso com os dados recebidos
            const curso = new Curso(
                CursoRecebido.nome,
                CursoRecebido.duracao,
                CursoRecebido.modalidade         
            );

            // Define o ID do Curso, que deve ser passado na query string
            curso.setIdCurso(parseInt(req.params.idCurso));

            console.log(CursoRecebido);

            // Chama o método para atualizar o cadastro do Curso no banco de dados
            if (await Curso.atualizarCadastroCurso(curso)) {
                return res.status(200).json({ mensagem: "Curso atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o Curso no banco de dados');
            }
        } catch (error) {
            // Caso ocorra algum erro, este é registrado nos logs do servidor
            console.error(`Erro no modelo: ${error}`);
            // Retorna uma resposta com uma mensagem de erro
            return res.json({ mensagem: "Erro ao atualizar medico." });
        }
    }
}

export default CursoController;
