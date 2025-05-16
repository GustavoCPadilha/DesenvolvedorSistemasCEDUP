package com.mycompany.produto;


public class Produto {
    String nome;
    float preco;
    int qtde;
    
    float valorEstoque()
    {
        return this.preco * this.qtde;
    }
    
    void disponivel()
    {
        if (qtde > 0)
        {
            System.out.println("Disponível");
        }
        else
        {
            System.out.println("Indisponível");
        }
    }
}
