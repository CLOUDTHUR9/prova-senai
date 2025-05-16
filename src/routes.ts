import { Request, Response, Router } from "express";
import { AlunoController } from "./controller/AlunoController";
import { CursoController } from "./controller/CursoController";
import { MatriculaController } from "./controller/MatriculaController";

// Cria um roteador
const router = Router();
// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, Mundo!" });
});

/* 
* ROTAS PARA ALUNO
*/ 
// Rota para listar os aluno
router.get("/listar/alunos", AlunoController.todos);
// Rota para cadastrar um novo médico
router.post("/cadastro/aluno", AlunoController.novo);
// Rota para deletar um novo médico
router.delete("/remover/aluno/:idAluno", AlunoController.remover);
// Rota para atualizar um novo médico
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar);


/* 
* ROTAS PARA CURSO
*/ 
// Rota para listar os curso
router.get("/listar/cursos", CursoController.todos);
// Rota para cadastrar um novo curso
router.post("/cadastro/curso", CursoController.novo);
// Rota para deletar um novo curso
router.delete("/remover/curso/:idCurso", CursoController.remover);
// Rota para atualizar um novo curso
router.put("/atualizar/curso/:idCurso", CursoController.atualizar);


/* 
* ROTAS PARA CONSULTAS
*/ 
// Rota para listar as consultas
router.get("/listar/matriculas", MatriculaController.todos);
// Rota para cadastrar uma nova consulta
router.post("/cadastro/matricula", MatriculaController.novo);
// Rota para deltar uma nova consulta
router.delete("/remover/matricula/:idMatricula", MatriculaController.remover);
// Rota para atualizar uma nova consulta
router.put("/atualizar/matricula/:idMatricula", MatriculaController.atualizar);

export { router };