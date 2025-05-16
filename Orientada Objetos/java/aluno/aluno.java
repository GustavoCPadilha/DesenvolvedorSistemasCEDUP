package com.mycompany.aluno;


public class Aluno 
{
    String nome;
    String matricula;
    float[] notas;
    
    float media()
    {
        float soma = 0f;
        int contador = 0;
        for (int i = 0; i < this.notas.length; i++)
        {
            soma += this.notas[i];
            contador++;
        }
        return soma / contador;
    }
    
    void situacao()
    {
        float media = media();
        if (media >= 6)
        {
            System.out.println("\nAprovado!");
        }
        else
        {
            System.out.println("\nReprovado!");
        }
    }
}
