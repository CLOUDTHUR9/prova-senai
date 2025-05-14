import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
}

/**
 * A classe AlunoController é responsável por controlar as requisições relacionadas aos Aluno.
 * 
 * - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "Aluno".
 */
export class AlunoController {

    /**
     * Lista todos os Aluno.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de Aluno em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Aluno.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeAlunos = await Aluno.listagemAlunos();
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log('Erro ao acessar listagem de pacientes:', error);
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de pacientes" });
        }
    }

    /**
     * Cadastra um novo Alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao cadastrar o Alunos.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface AlunosDTO
            const AlunoRecebido: AlunoDTO = req.body;

            // Instanciando um objeto do tipo Alunos com as informações recebidas
            const novoAluno = new Aluno(
                AlunoRecebido.nome,
                AlunoRecebido.cpf,
                AlunoRecebido.telefone,
                AlunoRecebido.email);

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Aluno.cadastroAluno(novoAluno);

            // Verifica a resposta da função
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o Aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao cadastrar um Aluno:', error);

            // Retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Aluno. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idAluno = parseInt(req.params.idAluno);
            const result = await Aluno.removerAluno(idAluno);
            
            if (result) {
                return res.status(200).json('Aluno removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar o Aluno');
            }
        } catch (error) {
            console.log("Erro ao remover o Aluno");
            console.log(error);
            return res.status(500).send("error");
        }
    }


    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const AlunoRecebido: AlunoDTO = req.body;
            
            // Instanciando objeto Aluno com os dados recebidos
            const aluno = new Aluno(
                AlunoRecebido.nome,
                AlunoRecebido.cpf,
                AlunoRecebido.telefone,
                AlunoRecebido.email         
            );

            // Define o ID do Aluno, que deve ser passado na query string
            aluno.setIdAluno(parseInt(req.params.idAluno));

            // Chama o método para atualizar o cadastro do Aluno no banco de dados
            if (await Aluno.atualizarCadastroAluno(aluno)) {
                return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o Aluno no banco de dados');
            }
        } catch (error) {
            // Caso ocorra algum erro, este é registrado nos logs do servidor
            console.error(`Erro no modelo: ${error}`);
            // Retorna uma resposta com uma mensagem de erro
            return res.json({ mensagem: "Erro ao atualizar medico." });
        }
    }
}

export default AlunoController;
