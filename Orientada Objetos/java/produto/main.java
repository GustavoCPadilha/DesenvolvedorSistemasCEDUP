/*
2) Implemente uma classe chamada “Produto” que possua atributos
para armazenar o nome, o preço e a quantidade em estoque.
Adicione métodos para calcular o valor total em estoque e verificar
se o produto está disponível;
*/

package com.mycompany.produto;


public class Ex02 {

    public static void main(String[] args) {
        Produto chiclete = new Produto();
        chiclete.nome = "Trident";
        chiclete.preco = 2.50f;
        chiclete.qtde = 7;
        
        float valorEstoque = chiclete.valorEstoque();
        System.out.format("Valor total em estoque: R$%.2f\n", valorEstoque);
        chiclete.disponivel();
    }
}
