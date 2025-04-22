package com.mycompany.revisao;

import java.util.Scanner;

public class Revisao 
{

    public static void main(String[] args) 
    {
        Scanner input = new Scanner(System.in);
        int[] vetor = new int[10];
        for(int i = 0; i < 10; i++)
        {
            System.out.printf("Digite o numero %d: ", i+1);
            vetor[i] = input.nextInt();
        }        
        int[] vetor_comparativo = new int[10];
        int num_inicial = vetor[0];
        int razao = vetor[1] - num_inicial;
        int num = num_inicial + razao;
        boolean ok = true;
        for(int i = 0; i < vetor.length; i++)
        {   
            if(i == 0)
            {
                vetor_comparativo[i] = num_inicial;
            }
            else if (i == 1)
            {
                vetor_comparativo[i] = num;
            }
            else
            {
            num = num + razao;
            vetor_comparativo[i] = num;
            }
        }
        for(int i = 0; i < vetor.length; i++)
        {
            if(vetor[i] != vetor_comparativo[i])
            {
                System.out.println("Nao e uma progressao aritmetica");
                ok = false;
                break;
            }
        }
        if(ok == true)
        {
            System.out.printf("E uma progressao aritmetica! Termo inicial %d, razao %d", num_inicial, razao);
        }
    }
}

