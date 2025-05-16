package com.mycompany.livro;


public class Livro {
    String titulo;
    String autor;
    int paginas;
    boolean disponivel;
    
    void emprestar()
    {
        if (disponivel == true)
        {
            System.out.println("Livro emprestado com sucesso!");
            this.disponivel = false;
        }
        else
        {
            System.out.println("ERRO! Livro indisponível!");
        }
    }
    
    void devolver()
    {
        if (disponivel == true)
        {
            System.out.println("ERRO! O livro não foi emprestado para ser devolvido!");
        }
        else
        {
            System.out.println("Livro devolvido com sucesso!");
            this.disponivel = true;
        }
    }
    
    void verificar()
    {
        if (disponivel == true)
        {
            System.out.println("Livro disponível!");
        }
        else
        {
            System.out.println("Livro indisponível!");
        }
    }
}
