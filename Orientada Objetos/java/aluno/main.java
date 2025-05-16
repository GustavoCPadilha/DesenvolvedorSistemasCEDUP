/*
1) Implemente uma classe chamada “Aluno” que possua atributos para
armazenar o nome, a matrícula e as notas de um aluno. Adicione
métodos para calcular a média das notas e verificar a situação do
aluno (aprovado ou reprovado);
*/


package com.mycompany.aluno;

import java.util.Scanner;

public class Ex01 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Aluno aluno = new Aluno();
        aluno.nome = "Gustavo";
        aluno.matricula = "4540667075";
        
        System.out.print("Digite a quantidade de notas do aluno: ");
        int qtde_notas = input.nextInt();
        aluno.notas = new float[qtde_notas];
        
        for(int i = 0; i < qtde_notas; i++)
        {
            System.out.format("Digite a nota %d: ", i+1);
            aluno.notas[i] = input.nextFloat();
        }
        
        float media = aluno.media();
        System.out.format("A média do aluno é de: %.2f", media);
        aluno.situacao();
    }
}
