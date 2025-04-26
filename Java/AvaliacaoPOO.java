/*package com.mycompany.avaliacaopoo;

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
*/
package com.mycompany.avaliacaopoo;


public class AvaliacaoPOO 
{

    public static void main(String[] args) 
    {
        int[][] matriz = new int[3][3];
        int j = 0;
        int num = 0;
        for (int i = 0; i < 3; i++)
        {
            for (j = 0; j <= 2; j++)
            {
                matriz[i][j] += num;
                num++;
            }
        }
        
        int linha1 = 0;
        int linha2 = 0;
        int linha3 = 0;
        int coluna1 = 0;
        int coluna2 = 0;
        int coluna3 = 0;

        for (int i = 0; i < 3; i++)
        {
            for (j = 0; j < 3; j++)
            {
                if (i == 0)
                {
                    linha1 += matriz[i][j];
                }
                if (i == 1)
                {
                    linha2 += matriz[i][j];
                }
                if (i == 2)
                {
                    linha3 += matriz[i][j];                                    
                }
                
                if (j == 0)
                {
                    coluna1 += matriz[i][j];
                }
                if (j == 1)
                {
                    coluna2 += matriz[i][j];
                }
                if (j == 2)
                {
                coluna3 += matriz[i][j];                                    
                }
            }
        }
        
        for (int i = 0; i < 3; i++)
        {
            for (j = 0; j < 3; j++)
            {
                System.out.printf("%d ", matriz[i][j]);
            }
            System.out.println();
        }
        
        System.out.printf("Somas:\nlinha 1: %d\nlinha 2: %d\nlinha 3: %d\n", linha1, linha2, linha3);
        System.out.printf("Somas:\ncoluna 1: %d\ncoluna 2: %d\ncoluna 3: %d\n", coluna1, coluna2, coluna3);
        
    }
}
