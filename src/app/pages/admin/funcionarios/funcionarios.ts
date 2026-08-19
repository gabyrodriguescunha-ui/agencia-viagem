import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CargoFuncionario, Funcionario } from "../../../models/funcionario";
import { FuncionarioService } from "../../../services/funcionario.service";
import { MenuAdmin } from "../menu-admin/menu-admin";

@Component({
  selector: "app-funcionarios",
  imports: [FormsModule, MenuAdmin],
  templateUrl: "./funcionarios.html",
  styleUrl: "./funcionarios.css",
})
export class Funcionarios {
  // Injeta o serviço responsável pelos funcionários.
  private readonly funcionarioService = inject(FuncionarioService);

  // Disponibiliza a lista reativa para o HTML.
  protected readonly funcionarios = this.funcionarioService.funcionarios;

  // Define as opções exibidas no campo de cargo.
  protected readonly cargos: CargoFuncionario[] = [
    "Administrador",
    "Atendimento",
    "Financeiro",
    "Guia de turismo",
  ];

  // Controla a exibição do formulário.
  protected formularioAberto = false;

  // Armazena temporariamente os dados digitados.
  protected formulario: Funcionario = this.criarFormularioVazio();

  // Abre o formulário para cadastrar um funcionário.
  protected novoFuncionario(): void {
    this.formulario = this.criarFormularioVazio();
    this.formularioAberto = true;
  }

  // Abre uma cópia do funcionário para edição.
  protected editar(funcionario: Funcionario): void {
    this.formulario = { ...funcionario };
    this.formularioAberto = true;
  }

  // Salva os dados preenchidos e fecha o formulário.
  protected salvar(): void {
    this.funcionarioService.salvar(this.formulario);
    this.cancelar();
  }

  // Altera a situação do funcionário selecionado.
  protected alterarSituacao(id: number): void {
    this.funcionarioService.alterarSituacao(id);
  }

  // Solicita confirmação antes de excluir um funcionário.
  protected excluir(funcionario: Funcionario): void {
    const confirmou = window.confirm(
      `Deseja excluir o funcionário ${funcionario.nome}?`,
    );

    if (confirmou) {
      this.funcionarioService.excluir(funcionario.id);
    }
  }

  // Fecha o formulário e limpa os campos.
  protected cancelar(): void {
    this.formularioAberto = false;
    this.formulario = this.criarFormularioVazio();
  }

  // Cria os valores iniciais do formulário.
  private criarFormularioVazio(): Funcionario {
    return {
      id: 0,
      nome: "",
      cargo: "Atendimento",
      email: "",
      telefone: "",
      ativo: true,
      cadastradoEm: "",
    };
  }
}