document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidade para mostrar/esconder o código dos projetos
    const codeButtons = document.querySelectorAll('.btn-codigo');

    codeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeContainer = button.nextElementSibling;
            const isVisible = codeContainer.style.display === 'block';
            
            codeContainer.style.display = isVisible ? 'none' : 'block';
            button.textContent = isVisible ? 'Ver Código' : 'Esconder Código';
        });
    });

    // Preencher os blocos de código com o conteúdo dos seus projetos Python
    const codigoEstoque = `import tkinter as tk
from tkinter import messagebox

class Produto:
    def __init__(self, nome, quantidade):
        self.nome = nome
        self.quantidade = quantidade

    def adicionar_estoque(self, quantidade):
        self.quantidade += quantidade

    def remover_estoque(self, quantidade):
        if quantidade <= self.quantidade:
            self.quantidade -= quantidade
            return True
        return False

    def exibir_estoque(self):
        return f"Estoque de {self.nome}: {self.quantidade} unidades."
    
class ControleEstoqueApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Controle de Estoque")

        self.produtos = {}

        self.nome_label = tk.Label(root, text="Nome do Produto:")
        self.nome_label.pack()
        self.nome_entry = tk.Entry(root)
        self.nome_entry.pack()

        self.quantidade_label = tk.Label(root, text="Quantidade:")
        self.quantidade_label.pack()
        self.quantidade_entry = tk.Entry(root)
        self.quantidade_entry.pack()

        self.adicionar_button = tk.Button(root, text="Adicionar Produto", command=self.adicionar_produto)
        self.adicionar_button.pack()

        self.remover_button = tk.Button(root, text="Remover Produto", command=self.remover_produto)
        self.remover_button.pack()

        self.exibir_button = tk.Button(root, text="Exibir Estoque", command=self.exibir_estoque)
        self.exibir_button.pack()

    def adicionar_produto(self):
        nome = self.nome_entry.get()
        try:
            quantidade = int(self.quantidade_entry.get())
            if nome in self.produtos:
                self.produtos[nome].adicionar_estoque(quantidade)
            else:
                self.produtos[nome] = Produto(nome, quantidade)
            messagebox.showinfo("Sucesso", f"{quantidade} unidades de {nome} adicionadas ao estoque.")
        except ValueError:
            messagebox.showerror("Erro", "Quantidade inválida.")

    def remover_produto(self):
        nome = self.nome_entry.get()
        try:
            quantidade = int(self.quantidade_entry.get())
            if nome in self.produtos and self.produtos[nome].remover_estoque(quantidade):
                messagebox.showinfo("Sucesso", f"{quantidade} unidades de {nome} removidas do estoque.")
            else:
                messagebox.showerror("Erro", f"Não há estoque suficiente de {nome}.")
        except ValueError:
            messagebox.showerror("Erro", "Quantidade inválida.")

    def exibir_estoque(self):
        estoque_info = "\\n".join([produto.exibir_estoque() for produto in self.produtos.values()])
        messagebox.showinfo("Estoque Atual", estoque_info if estoque_info else "Nenhum produto no estoque.")

if __name__ == "__main__":
    root = tk.Tk()
    app = ControleEstoqueApp(root)
    root.mainloop()`;

    const codigoCardapio = `import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk

class CardapioDigitalApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Cardápio Digital com Desconto")
        self.root.geometry("800x800")

        # ... (código completo do cardápio aqui)

if __name__ == "__main__":
    root = tk.Tk()
    app = CardapioDigitalApp(root)
    root.mainloop()`;

    // Injeta o código nos elementos <pre><code>
    document.querySelectorAll('.codigo-container code')[0].textContent = codigoEstoque;
    document.querySelectorAll('.codigo-container code')[1].textContent = codigoCardapio;
});