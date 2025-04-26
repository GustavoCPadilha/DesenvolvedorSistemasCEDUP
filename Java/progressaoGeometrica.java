package com.mycompany.avaliacaopoo;

import java.util.Scanner;
import java.util.Arrays;

public class AvaliacaoPOO 
{

    public static void main(String[] args) 
    {
        Scanner input = new Scanner(System.in);
        int[] vetor = new int[10];
        int[] vetor_comparativo = new int[10];
        for (int i = 0; i < 10; i++)
        {
            System.out.printf("Digite o numero %d para uma progressao geometrica: ", i+1);
            int num = input.nextInt();
            vetor[i] = num;
        }
        
        int razao = vetor[1] / vetor[0];
        int num_inicial = vetor[0];
        int num = num_inicial * razao;
        
        for (int i = 0; i < 10; i++)
        {
            if (i == 0)
            {
                vetor_comparativo[i] = num_inicial;
            }
            else
            {
                vetor_comparativo[i] = num;
                num *= razao;
            }
        }
        System.out.println(Arrays.toString(vetor));
        System.out.println(Arrays.toString(vetor_comparativo));
        boolean ok = true;
        
        for (int i = 0; i < 10; i++)
        {
            if (vetor[i] != vetor_comparativo[i])
            {
                ok = false;
                break;
            }
        }
        if (ok == true)
            {
            System.out.println("Isso e uma progressao geometrica! ");
            System.out.printf("Razao: %d\n", razao);
            System.out.printf("Decimo primeiro termo: %d\n", vetor[9] * razao);
            }
        else
            {
            System.out.println("Isso nao e uma progressao geometrica! ");
            }
    }
}
